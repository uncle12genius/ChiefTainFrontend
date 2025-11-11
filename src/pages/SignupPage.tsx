import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { SignupCredentials } from '../types/auth.types';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', confirmPassword: '', agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState({ password: false, confirm: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('❌ Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      toast.error('❌ Please agree to the Terms and Conditions');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, agreeTerms, ...credentials } = formData;
      await signup(credentials as SignupCredentials);
      toast.success('🎉 Account created successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(`❌ ${err.response?.data?.message || 'Signup failed. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirm') => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const formFields = [
    {
      id: 'firstName', label: 'First Name *', type: 'text', icon: '👤', required: true,
      grid: 'md:grid-cols-2', autoComplete: 'given-name'
    },
    {
      id: 'lastName', label: 'Last Name *', type: 'text', icon: '👤', required: true,
      grid: 'md:grid-cols-2', autoComplete: 'family-name'
    },
    {
      id: 'email', label: 'Email Address *', type: 'email', icon: '📧', required: true,
      grid: 'md:grid-cols-2', autoComplete: 'email'
    },
    {
      id: 'phone', label: 'Phone Number', type: 'tel', icon: '📱', required: false,
      grid: 'md:grid-cols-2', autoComplete: 'tel'
    },
    {
      id: 'password', label: 'Password *', type: showPassword.password ? 'text' : 'password', 
      icon: '🔒', required: true, grid: 'md:grid-cols-2', autoComplete: 'new-password',
      showToggle: true, field: 'password'
    },
    {
      id: 'confirmPassword', label: 'Confirm Password *', 
      type: showPassword.confirm ? 'text' : 'password', icon: '✅', required: true,
      grid: 'md:grid-cols-2', autoComplete: 'new-password', showToggle: true, field: 'confirm'
    }
  ];

  const renderInputField = (field: any) => (
    <div key={field.id}>
      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">{field.icon}</span>
        </div>
        <input
          id={field.id}
          name={field.id}
          type={field.type}
          autoComplete={field.autoComplete}
          required={field.required}
          value={formData[field.id as keyof typeof formData] as string}
          onChange={handleChange}
          className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-0 transition-colors duration-300 bg-white/50"
          placeholder={`Enter your ${field.id.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
        />
        {field.showToggle && (
          <button
            type="button"
            onClick={() => togglePasswordVisibility(field.field)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword[field.field] ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-green-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4 hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-600 hover:text-green-600 font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field, index) => (
              <div key={field.id} className={index % 2 === 0 ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}>
                {renderInputField(field)}
                {index % 2 === 0 && index + 1 < formFields.length && renderInputField(formFields[index + 1])}
              </div>
            )).filter((_, index) => index % 2 === 0)}

            <div className="flex items-center space-x-3">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-orange-600 hover:text-green-600 font-medium">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg border-0"
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;