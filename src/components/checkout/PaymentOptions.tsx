import React from 'react';
import Button from '../common/Button';

interface PaymentOptionsProps {
  selectedMethod: 'MPESA' | 'CASH_ON_DELIVERY';
  onSelect: (method: 'MPESA' | 'CASH_ON_DELIVERY') => void;
  onBack: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  selectedMethod,
  onSelect,
  onBack,
}) => {
  const paymentMethods = [
    {
      id: 'MPESA',
      name: 'M-Pesa',
      description: 'Pay securely with M-Pesa',
      icon: '📱',
      details: 'You will receive a prompt on your phone to complete the payment',
    },
    {
      id: 'CASH_ON_DELIVERY',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: '💵',
      details: 'Pay with cash when your order is delivered',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedMethod === method.id
                ? 'border-primary bg-primary-50'
                : 'border-gray-300 hover:border-primary'
            }`}
            onClick={() => onSelect(method.id as 'MPESA' | 'CASH_ON_DELIVERY')}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-2xl">
                {method.icon}
              </div>
              
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {method.name}
                </h3>
                <p className="text-gray-600">{method.description}</p>
                <p className="text-sm text-gray-500 mt-1">{method.details}</p>
              </div>
              
              <div className="flex-shrink-0">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method.id
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back to Shipping
        </Button>
        <Button
          onClick={() => onSelect(selectedMethod)}
          className="flex-1"
        >
          Review Order
        </Button>
      </div>
    </div>
  );
};

export default PaymentOptions;