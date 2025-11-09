import React from 'react';
import type { Cart } from '../../types/cart.types';

interface OrderSummaryProps {
  cart: Cart;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart }) => {
  const shippingCost = cart.totalAmount > 10000 ? 0 : 500;
  const tax = cart.totalAmount * 0.14;
  const total = cart.totalAmount + shippingCost + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      {/* Order Items */}
      <div className="space-y-3 mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {item.product.name}
                </p>
                <p className="text-gray-500 text-xs">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-medium text-gray-900 text-sm">
              KSh {(item.quantity * item.product.price).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">KSh {cart.totalAmount.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {shippingCost === 0 ? 'Free' : `KSh ${shippingCost.toLocaleString()}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (VAT 14%)</span>
          <span className="text-gray-900">KSh {tax.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between text-lg font-medium border-t border-gray-200 pt-3">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">KSh {total.toLocaleString()}</span>
        </div>
      </div>

      {cart.totalAmount < 10000 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            Add KSh {(10000 - cart.totalAmount).toLocaleString()} more for free shipping!
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;