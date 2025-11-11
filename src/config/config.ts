interface AppConfig {
  env: string;
  apiUrl: string;
  appName: string;
  version: string;
  enableDebug: boolean;
  mpesaTestMode: boolean;
  defaultCurrency: string;
  defaultCountry: string;
  maxUploadSize: number;
}

export const config: AppConfig = {
  env: process.env.REACT_APP_ENV || 'development',
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  appName: process.env.REACT_APP_APP_NAME || 'Chieftain',
  version: process.env.REACT_APP_VERSION || '1.0.0',
  enableDebug: process.env.REACT_APP_ENABLE_DEBUG === 'true',
  mpesaTestMode: process.env.REACT_APP_MPESA_TEST_MODE === 'true',
  defaultCurrency: process.env.REACT_APP_DEFAULT_CURRENCY || 'KSh',
  defaultCountry: process.env.REACT_APP_DEFAULT_COUNTRY || 'Kenya',
  maxUploadSize: parseInt(process.env.REACT_APP_MAX_UPLOAD_SIZE || '10485760'),
};

// Development-only logging
if (config.enableDebug) {
  console.log('App Config:', config);
}