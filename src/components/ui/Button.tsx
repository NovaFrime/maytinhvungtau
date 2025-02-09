import { ButtonHTMLAttributes, forwardRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText = 'Đang xử lý...',
      fullWidth = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition-colors';
    
    const variantStyles = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300',
      secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:bg-gray-50',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-50',
      ghost: 'text-gray-600 hover:bg-gray-100 disabled:bg-transparent',
      danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300'
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${widthStyle}
          ${loading || disabled ? 'cursor-not-allowed opacity-75' : ''}
          ${className}
        `}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" text="" />
            <span className="ml-2">{loadingText}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;