import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  type?: 'spinner' | 'dots' | 'pulse';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '',
  text = '',
  type = 'spinner'
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const SpinnerLoader = () => (
    <div className="relative">
      <div
        className={`animate-spin rounded-full border-4 border-orange-200 ${sizeClasses[size]}`}
      ></div>
      <div
        className={`animate-spin rounded-full border-4 border-transparent border-t-green-500 border-r-orange-500 absolute top-0 left-0 ${sizeClasses[size]}`}
      ></div>
    </div>
  );

  const DotsLoader = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`animate-bounce rounded-full bg-gradient-to-r from-orange-500 to-green-500 ${
            size === 'sm' ? 'w-2 h-2' : 
            size === 'md' ? 'w-3 h-3' : 
            size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        ></div>
      ))}
    </div>
  );

  const PulseLoader = () => (
    <div
      className={`animate-pulse rounded-full bg-gradient-to-r from-orange-500 to-green-500 ${
        size === 'sm' ? 'w-5 h-5' : 
        size === 'md' ? 'w-10 h-10' : 
        size === 'lg' ? 'w-16 h-16' : 'w-20 h-20'
      }`}
    ></div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex items-center justify-center">
        {renderLoader()}
      </div>
      {text && (
        <p className={`mt-3 font-medium text-gray-600 ${textSizes[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;