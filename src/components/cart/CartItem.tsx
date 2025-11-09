import React from 'react';
import { Link } from 'react-router-dom';
import  type { CartItem as CartItemType } from '../../types/cart.types';
import { useCart } from '../../context/CartContext';
import QuantityAdjuster from './QuantityAdjuster';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = async () => {
    try {
      await removeFromCart(item.id);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity === 0) {
      await handleRemove();
      return;
    }

    try {
      await updateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <li className="px-6 py-4">
      <div className="flex items-center">
        <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
          <img
            src={item.product.imageUrl || '/api/placeholder/150/150'}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </Link>

        <div className="ml-4 flex-1">
          <Link
            to={`/products/${item.product.id}`}
            className="text-lg font-medium text-gray-900 hover:text-primary"
          >
            {item.product.name}
          </Link>
          <p className="text-gray-500 text-sm">{item.product.brand}</p>
          <p className="text-gray-500 text-sm capitalize">
            Condition: {item.product.condition.toLowerCase()}
          </p>
          
          <div className="mt-2 flex items-center">
            <QuantityAdjuster
              quantity={item.quantity}
              onQuantityChange={handleQuantityChange}
              maxQuantity={item.product.stock}
            />
            
            <button
              onClick={handleRemove}
              className="ml-4 text-sm text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        </div>

        <div className="ml-4 text-right">
          <p className="text-lg font-medium text-gray-900">
            KSh {(item.quantity * item.product.price).toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm">
            KSh {item.product.price.toLocaleString()} each
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;