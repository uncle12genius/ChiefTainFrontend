import env from '../config/env';

export const API_BASE_URL = env.apiUrl;
export const APP_NAME = env.appName;
export const APP_VERSION = env.version;
export const DEFAULT_CURRENCY = env.defaultCurrency;
export const DEFAULT_COUNTRY = env.defaultCountry;
export const MAX_UPLOAD_SIZE = 10485760; // 10MB

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