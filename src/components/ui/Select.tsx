'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      size = 'md',
      fullWidth = false,
      startIcon,
      endIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'py-1 text-sm',
      md: 'py-2 text-base',
      lg: 'py-3 text-lg'
    };

    const width = fullWidth ? 'w-full' : '';
    const hasError = !!error;

    return (
      <div className={width}>
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
          <select
            ref={ref}
            className={`
              block rounded-md shadow-sm
              ${startIcon ? 'pl-10' : 'pl-4'}
              ${endIcon ? 'pr-10' : 'pr-8'}
              ${sizes[size]}
              ${
                hasError
                  ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
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
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {endIcon || (
              <svg
                className={`h-5 w-5 text-gray-400 ${disabled ? 'opacity-50' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
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

Select.displayName = 'Select';