import { OrderStatus } from '../types/order.types';

export const formatCurrency = (amount: number): string => {
  return `KSh ${amount.toLocaleString()}`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'DELIVERED':
      return 'text-green-600 bg-green-100';
    case 'SHIPPED':
      return 'text-blue-600 bg-blue-100';
    case 'CONFIRMED':
    case 'PACKED':
      return 'text-yellow-600 bg-yellow-100';
    case 'PLACED':
      return 'text-gray-600 bg-gray-100';
    case 'CANCELLED':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};