import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/product.types';
import { productService } from '../services/productServices';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LandingPage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await productService.getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Genuine Parts",
      description: "100% authentic components from trusted manufacturers with warranty"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Perfect Compatibility",
      description: "Guaranteed fit for your laptop model with our compatibility checker"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Fast & Free Shipping",
      description: "Free delivery on orders over $50 with real-time tracking"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Expert Support",
      description: "24/7 customer support and technical assistance"
    }
  ];

  const FeatureCard: React.FC<{ feature: typeof features[0] }> = ({ feature }) => (
    <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  );

  const HeroSection = () => (
    <section className="bg-gradient-to-br from-slate-900 via-orange-900 to-green-900 text-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Premium <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">Laptop Parts</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 leading-relaxed">
            Genuine replacement parts with guaranteed compatibility and competitive pricing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/products"
              className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[200px]"
            >
              🛍️ Shop Now
            </Link>
            <Link
              to="/products?category=batteries"
              className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 min-w-[200px]"
            >
              🔋 Browse Batteries
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>100% Genuine Parts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free Shipping Over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>30-Day Return Policy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-orange-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">Laptop Parts?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide the highest quality laptop components with exceptional service and support
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );

  const FeaturedProductsSection = () => (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-gray-600 text-lg">Top-quality parts customers love</p>
          </div>
          <Link
            to="/products"
            className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap"
          >
            View All Products →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Featured Products</h3>
            <p className="text-gray-600 mb-6">Check back soon for our featured laptop parts</p>
            <Link
              to="/products"
              className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold inline-block"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );

  const CTASection = () => (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-orange-600 to-green-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Ready to Repair Your Laptop?
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-orange-100 leading-relaxed">
          Join thousands of satisfied customers who trust us for their laptop repair needs with genuine parts and expert support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/signup"
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[200px]"
          >
            🚀 Create Account
          </Link>
          <Link
            to="/products"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 min-w-[200px]"
          >
            🔍 Browse Products
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <span>5000+ Happy Customers</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <span>1000+ Laptop Models</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;