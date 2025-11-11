import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { LoginCredentials } from '../types/auth.types';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(credentials);
      toast.success('🎉 Welcome back! Login successful!');
      navigate(from, { replace: true });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (field: string) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const fillDemoCredentials = (role: 'user' | 'admin') => {
    const demoCredentials = {
      user: { email: 'user@example.com', password: 'password123' },
      admin: { email: 'admin@example.com', password: 'admin123' }
    };
    
    setCredentials(demoCredentials[role]);
    toast.info(`👤 ${role.charAt(0).toUpperCase() + role.slice(1)} demo credentials filled!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Animated Logo */}
        <Link to="/" className="flex justify-center group">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
        </Link>
        
        {/* Header Section */}
        <div className="text-center mt-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Sign in to your account to continue
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Or{' '}
            <Link
              to="/signup"
              className="font-semibold text-orange-600 hover:text-green-600 transition-colors duration-200"
            >
              create a new account
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-lg border border-white/20 py-8 px-6 shadow-2xl rounded-3xl transform hover:scale-[1.01] transition-all duration-500">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl animate-shake">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className={`w-5 h-5 transition-colors duration-300 ${isFocused.email ? 'text-orange-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="block w-full pl-10 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-orange-400 transition-all duration-300 placeholder-gray-400 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className={`w-5 h-5 transition-colors duration-300 ${isFocused.password ? 'text-green-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  className="block w-full pl-10 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-green-400 transition-all duration-300 placeholder-gray-400 backdrop-blur-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center group cursor-pointer">
                <div className="relative">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-lg bg-white group-hover:border-orange-400 transition-colors duration-200 flex items-center justify-center">
                    <svg className="w-3 h-3 text-orange-500 opacity-0 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Sign In Button */}
            <div>
              <Button
                type="submit"
                loading={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-orange-200 border-0 font-semibold text-lg"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>

           
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;