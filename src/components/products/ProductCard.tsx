import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product.types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [addingToCart, setAddingToCart] = React.useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    try {
      setAddingToCart(true);
      await addToCart(product.id, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="card group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
        <img
          src={product.imageUrl || '/api/placeholder/400/400'}
          alt={product.name}
          className="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 flex-1">
            {product.name}
          </h3>
          <div className="ml-2 flex-shrink-0">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              {product.condition.toLowerCase()}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <svg
                key={rating}
                className={`h-4 w-4 flex-shrink-0 ${
                  product.ratings > rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="ml-1 text-sm text-gray-500">
            {product.ratings.toFixed(1)} ({product.reviewCount})
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            KSh {product.price.toLocaleString()}
          </p>
          
          {user && product.stock > 0 && (
            <Button
              size="sm"
              loading={addingToCart}
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Add to Cart
            </Button>
          )}
        </div>

        {product.stock === 0 && (
          <p className="text-sm text-red-600 mt-2">Out of Stock</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;