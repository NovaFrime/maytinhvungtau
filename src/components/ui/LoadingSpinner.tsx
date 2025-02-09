'use client';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  className = ''
}: LoadingSpinnerProps) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colors = {
    primary: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-400'
  };

  return (
    <div className={`${sizes[size]} ${colors[color]} ${className}`}>
      <svg
        className="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export interface LoadingOverlayProps extends LoadingSpinnerProps {
  fullScreen?: boolean;
}

export const LoadingOverlay = ({ fullScreen = false, ...props }: LoadingOverlayProps) => {
  const baseClasses = "flex items-center justify-center bg-white bg-opacity-75";
  const positionClasses = fullScreen ? "fixed inset-0 z-50" : "absolute inset-0";

  return (
    <div className={`${baseClasses} ${positionClasses}`}>
      <LoadingSpinner size="lg" {...props} />
    </div>
  );
};

export const FullPageLoading = (props: LoadingSpinnerProps) => (
  <LoadingOverlay fullScreen {...props} />
);