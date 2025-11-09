import React from 'react';

interface QuantityAdjusterProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity: number;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({
  quantity,
  onQuantityChange,
  maxQuantity,
}) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg">
      <button
        onClick={decreaseQuantity}
        disabled={quantity <= 1}
        className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        -
      </button>
      
      <span className="px-3 py-1 text-gray-900 min-w-12 text-center">
        {quantity}
      </span>
      
      <button
        onClick={increaseQuantity}
        disabled={quantity >= maxQuantity}
        className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
};

export default QuantityAdjuster;