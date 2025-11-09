import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginCredentials } from '../../types/auth.types';
import Button from '../common/Button';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(credentials);
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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

  const fillDemoCredentials = (role: 'user' | 'admin') => {
    if (role === 'user') {
      setCredentials({
        email: 'user@example.com',
        password: 'password123',
      });
    } else {
      setCredentials({
        email: 'admin@example.com',
        password: 'admin123',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={credentials.email}
          onChange={handleChange}
          className="mt-1 input-field"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={credentials.password}
          onChange={handleChange}
          className="mt-1 input-field"
          placeholder="Enter your password"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-primary hover:text-primary-dark">
            Forgot your password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Sign In
      </Button>

      {/* Quick Fill Buttons */}
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => fillDemoCredentials('user')}
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Fill User Demo
        </button>
        <button
          type="button"
          onClick={() => fillDemoCredentials('admin')}
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Fill Admin Demo
        </button>
      </div>
    </form>
  );
};

export default LoginForm;