'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const width = fullWidth ? 'w-full' : '';
    const hasError = !!error;

    return (
      <div className={`${width}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-sm font-medium mb-1 ${
              hasError
                ? 'text-red-500'
                : disabled
                ? 'text-gray-400'
                : 'text-gray-700'
            }`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className={`text-gray-500 ${disabled ? 'opacity-50' : ''}`}>
                {startIcon}
              </span>
            </div>
          )}
          <input
            ref={ref}
            className={`
              block rounded-md shadow-sm
              ${startIcon ? 'pl-10' : 'pl-4'}
              ${endIcon ? 'pr-10' : 'pr-4'}
              ${
                hasError
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }
              ${
                disabled
                  ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                  : 'bg-white'
              }
              ${width}
              ${className}
            `}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${props.id}-error` : props.id ? `${props.id}-helper` : undefined
            }
            {...props}
          />
          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className={`text-gray-500 ${disabled ? 'opacity-50' : ''}`}>
                {endIcon}
              </span>
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={`mt-1 text-sm ${
              hasError ? 'text-red-500' : 'text-gray-500'
            }`}
            id={hasError ? `${props.id}-error` : props.id ? `${props.id}-helper` : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';