import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product, Review } from '../types/product.types';
import { productService } from '../services/productServices';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import ReviewSection from '../components/products/ReviewSection';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const productData = await productService.getProduct(id);
        setProduct(productData);
        // In a real app, you'd fetch reviews separately
        setReviews([]); // Placeholder for reviews
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!product) return;

    if (!user) {
      navigate('/login', { state: { from: `/products/${product.id}` } });
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(product.id, quantity);
      // Show success message or notification
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <button
                onClick={() => navigate('/products')}
                className="text-gray-400 hover:text-gray-500"
              >
                Products
              </button>
            </li>
            <li>
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <span className="text-gray-500">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            <div className="w-full aspect-w-1 aspect-h-1">
              <img
                src={product.imageUrl || '/api/placeholder/600/600'}
                alt={product.name}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center space-x-4">
                <p className="text-3xl text-gray-900">KSh {product.price.toLocaleString()}</p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-xl text-gray-500 line-through">
                    KSh {product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        product.ratings > rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-900">
                  {product.ratings.toFixed(1)} out of 5 stars
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {product.reviewCount} reviews
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Brand</dt>
                    <dd className="text-sm text-gray-900">{product.brand}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Condition</dt>
                    <dd className="text-sm text-gray-900 capitalize">{product.condition.toLowerCase()}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Stock</dt>
                    <dd className="text-sm text-gray-900">
                      {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                    <dd className="text-sm text-gray-900">{product.category.name}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Compatibility */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Compatible With</h3>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.map((model) => (
                      <span
                        key={model}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mt-10">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700 mr-3">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map(
                      (num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="flex space-x-4 flex-1">
                  <Button
                    onClick={handleAddToCart}
                    loading={addingToCart}
                    disabled={product.stock === 0}
                    className="flex-1"
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                  
                  <Button
                    onClick={handleBuyNow}
                    variant="secondary"
                    loading={addingToCart}
                    disabled={product.stock === 0}
                    className="flex-1"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection reviews={reviews} productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;