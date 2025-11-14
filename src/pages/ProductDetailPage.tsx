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
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const stockNum = Number(product?.stock ?? 0);
  const maxSelectable = stockNum > 0 ? Math.min(stockNum, 10) : 1;

  useEffect(() => {
    setQuantity(q => stockNum === 0 ? 1 : Math.min(q, maxSelectable));
  }, [stockNum, maxSelectable]);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) {
        navigate('/products');
        return;
      }

      try {
        setLoading(true);
        const productData = await productService.getProduct(id);
        setProduct(productData ?? null);
        setReviews([]);
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
        <LoadingSpinner size="lg" text="Loading product..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const {
    name = 'Unnamed product',
    imageUrl = '/api/placeholder/600/600',
    price,
    originalPrice,
    ratings = 0,
    reviewCount = 0,
    condition = '',
    brand = 'Unknown',
    category,
    description = 'No description available.',
    compatibility = []
  } = product;

  const priceNum = price != null ? Number(price) : null;
  const originalPriceNum = originalPrice != null ? Number(originalPrice) : null;
  const hasDiscount = originalPriceNum && originalPriceNum > (priceNum ?? 0);

  const Breadcrumb = () => (
    <nav className="flex mb-8">
      <ol className="flex items-center space-x-4">
        <li>
          <button onClick={() => navigate('/products')} className="text-gray-400 hover:text-orange-600 transition-colors">
            Products
          </button>
        </li>
        <li>
          <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </li>
        <li className="text-gray-500 truncate max-w-xs">{name}</li>
      </ol>
    </nav>
  );

  const StarRating = () => (
    <div className="flex items-center space-x-1">
      {[0, 1, 2, 3, 4].map((rating) => (
        <svg
          key={rating}
          className={`w-5 h-5 ${ratings > rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-sm text-gray-600">{ratings.toFixed(1)} ({reviewCount} reviews)</span>
    </div>
  );

  const PriceDisplay = () => (
    <div className="flex items-center space-x-4">
      <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
        KSh {priceNum?.toLocaleString() ?? '—'}
      </p>
      {hasDiscount && (
        <p className="text-2xl text-gray-500 line-through">KSh {originalPriceNum?.toLocaleString()}</p>
      )}
      {hasDiscount && (
        <span className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          Save {Math.round(((originalPriceNum! - priceNum!) / originalPriceNum!) * 100)}%
        </span>
      )}
    </div>
  );

  const StockBadge = () => (
    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
      stockNum > 0 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {stockNum > 0 ? `✅ ${stockNum} in stock` : '❌ Out of stock'}
    </div>
  );

  const SpecificationItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-3 border-b border-gray-100">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb />

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Product Image */}
            <div className="p-8">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-2xl overflow-hidden">
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
                  <StarRating />
                </div>

                <PriceDisplay />
                <StockBadge />

                <div className="prose prose-lg">
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>

                {/* Specifications */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Specifications</h3>
                  <div className="space-y-2">
                    <SpecificationItem label="Brand" value={brand} />
                    <SpecificationItem label="Condition" value={condition.toLowerCase() || 'N/A'} />
                    <SpecificationItem label="Category" value={category?.name || 'Uncategorized'} />
                  </div>
                </div>

                {/* Compatibility */}
                {compatibility.length > 0 && (
                  <div className="bg-orange-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">💻 Compatible Models</h3>
                    <div className="flex flex-wrap gap-2">
                      {compatibility.map((model) => (
                        <span key={String(model)} className="bg-white border border-orange-200 text-orange-700 px-3 py-2 rounded-xl text-sm font-medium">
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-gray-700 font-medium">Quantity:</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      disabled={stockNum === 0}
                      className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-orange-400 focus:ring-0"
                    >
                      {Array.from({ length: maxSelectable }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      onClick={handleAddToCart}
                      loading={addingToCart}
                      disabled={stockNum === 0}
                      className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                    >
                      {stockNum === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
                    </Button>

                    <Button
                      onClick={handleBuyNow}
                      variant="secondary"
                      loading={addingToCart}
                      disabled={stockNum === 0}
                      className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-4 rounded-xl font-bold text-lg transition-all duration-300"
                    >
                      ⚡ Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <ReviewSection reviews={reviews} productId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;