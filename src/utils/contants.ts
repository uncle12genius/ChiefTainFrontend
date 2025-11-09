export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const BRAND_COLORS = {
  primary: '#FF6B35',
  primaryDark: '#E55A2B',
  secondary: '#28A745',
  secondaryDark: '#218838',
  background: '#FFFFFF',
};

export const ORDER_STATUS = {
  PLACED: 'PLACED',
  CONFIRMED: 'CONFIRMED',
  PACKED: 'PACKED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;

export const PAYMENT_METHODS = {
  MPESA: 'MPESA',
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
} as const;

export const PRODUCT_CONDITIONS = {
  NEW: 'NEW',
  REFURBISHED: 'REFURBISHED',
  USED: 'USED',
} as const;