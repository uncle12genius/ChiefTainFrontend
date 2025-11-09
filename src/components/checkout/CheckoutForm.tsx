import React from 'react';
import { Cart } from '../../types/cart.types';

interface CartSummaryProps {
  cart: Cart;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
  const shippingCost = cart.totalAmount > 10000 ? 0 : 500; // Free shipping over 10,000
  const tax = cart.totalAmount * 0.14; // 14% VAT
  const total = cart.totalAmount + shippingCost + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">KSh {cart.totalAmount.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {shippingCost === 0 ? 'Free' : `KSh ${shippingCost.toLocaleString()}`}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (VAT 14%)</span>
          <span className="text-gray-900">KSh {tax.toLocaleString()}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-medium text-gray-900">Total</span>
            <span className="text-lg font-medium text-gray-900">
              KSh {total.toLocaleString()}
            </span>
          </div>
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

export default CartSummary;