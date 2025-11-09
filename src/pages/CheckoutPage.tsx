import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShippingAddress } from '../types/order.types';
import { orderService } from '../services/orderService';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import PaymentOptions from '../components/checkout/PaymentOptions';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    country: 'Kenya',
  });
  const [paymentMethod, setPaymentMethod] = useState<'MPESA' | 'CASH_ON_DELIVERY'>('MPESA');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!cart || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleShippingSubmit = (address: ShippingAddress) => {
    setShippingAddress(address);
    setStep('payment');
  };

  const handlePaymentSubmit = (method: 'MPESA' | 'CASH_ON_DELIVERY') => {
    setPaymentMethod(method);
    setStep('review');
  };

  const handleOrderSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const order = await orderService.createOrder({
        shippingAddress,
        paymentMethod,
      });

      await clearCart();
      navigate('/dashboard/orders', { 
        state: { 
          message: 'Order placed successfully!',
          orderId: order.id
        }
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'shipping':
        return (
          <CheckoutForm
            address={shippingAddress}
            onSubmit={handleShippingSubmit}
            onBack={() => navigate('/cart')}
          />
        );
      case 'payment':
        return (
          <PaymentOptions
            selectedMethod={paymentMethod}
            onSelect={handlePaymentSubmit}
            onBack={() => setStep('shipping')}
          />
        );
      case 'review':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Order</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {/* Shipping Address */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Address</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                <p>{shippingAddress.address}</p>
                <p>{shippingAddress.city}, {shippingAddress.country}</p>
                <p>{shippingAddress.phone}</p>
                <p>{shippingAddress.email}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">
                  {paymentMethod === 'MPESA' ? 'M-Pesa' : 'Cash on Delivery'}
                </p>
                {paymentMethod === 'MPESA' && (
                  <p className="text-sm text-gray-600 mt-1">
                    You will receive a prompt on your phone to complete the payment
                  </p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
              <div className="space-y-3">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">
                      KSh {(item.quantity * item.product.price).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setStep('payment')}
                className="flex-1"
              >
                Back to Payment
              </Button>
              <Button
                onClick={handleOrderSubmit}
                loading={loading}
                className="flex-1"
              >
                Place Order
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {['shipping', 'payment', 'review'].map((s, index) => (
              <React.Fragment key={s}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === s
                        ? 'bg-primary text-white'
                        : index < ['shipping', 'payment', 'review'].indexOf(step)
                        ? 'bg-secondary text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      step === s || index < ['shipping', 'payment', 'review'].indexOf(step)
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`w-16 h-1 mx-4 ${
                      index < ['shipping', 'payment', 'review'].indexOf(step)
                        ? 'bg-secondary'
                        : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            {renderStep()}
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0 lg:col-span-5">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;