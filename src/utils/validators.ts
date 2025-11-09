export const required = (value: any): string | undefined => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return 'This field is required';
  }
  return undefined;
};

export const email = (value: string): string | undefined => {
  if (!value) return undefined;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const minLength = (min: number) => (value: string): string | undefined => {
  if (value && value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return undefined;
};

export const maxLength = (max: number) => (value: string): string | undefined => {
  if (value && value.length > max) {
    return `Must be no more than ${max} characters`;
  }
  return undefined;
};

export const password = (value: string): string | undefined => {
  if (!value) return undefined;
  
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  
  if (!/(?=.*[a-z])/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/(?=.*[A-Z])/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/(?=.*\d)/.test(value)) {
    return 'Password must contain at least one number';
  }
  
  return undefined;
};

export const confirmPassword = (password: string) => (value: string): string | undefined => {
  if (value !== password) {
    return 'Passwords do not match';
  }
  return undefined;
};