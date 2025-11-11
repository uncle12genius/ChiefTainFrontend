// Environment configuration with fallbacks
const env = {
  apiUrl: import.meta.env?.REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  appName: import.meta.env?.REACT_APP_APP_NAME || process.env.REACT_APP_APP_NAME || 'Chieftain',
  version: import.meta.env?.REACT_APP_VERSION || process.env.REACT_APP_VERSION || '1.0.0',
  defaultCurrency: import.meta.env?.REACT_APP_DEFAULT_CURRENCY || process.env.REACT_APP_DEFAULT_CURRENCY || 'KSh',
  defaultCountry: import.meta.env?.REACT_APP_DEFAULT_COUNTRY || process.env.REACT_APP_DEFAULT_COUNTRY || 'Kenya',
};

export default env;