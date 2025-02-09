'use client';

import { useState, useEffect } from 'react';

interface BackToTopProps {
  showAt?: number;
  smoothScroll?: boolean;
  className?: string;
}

export const BackToTop = ({
  showAt = 400,
  smoothScroll = true,
  className = ''
}: BackToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAt) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAt]);

  const scrollToTop = () => {
    if (smoothScroll) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-50
        p-3 rounded-full shadow-lg
        bg-blue-600 text-white
        hover:bg-blue-700
        transition-all duration-300 ease-in-out
        transform hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        ${className}
      `}
      aria-label="Back to top"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>

      {/* Ripple effect on click */}
      <span className="absolute inset-0 rounded-full overflow-hidden">
        <span className="absolute inset-0 bg-white animate-ripple opacity-25" />
      </span>
    </button>
  );
};

// Add BackToTop to App Layout
export const withBackToTop = (WrappedComponent: React.ComponentType) => {
  return function WithBackToTop(props: any) {
    return (
      <>
        <WrappedComponent {...props} />
        <BackToTop />
      </>
    );
  };
};