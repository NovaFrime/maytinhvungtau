'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
}

export const Tooltip = ({
  content,
  children,
  position = 'top',
  delay = 0,
  className = ''
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const positions = {
      top: {
        top: triggerRect.top - tooltipRect.height - 8,
        left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      },
      right: {
        top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
        left: triggerRect.right + 8
      },
      bottom: {
        top: triggerRect.bottom + 8,
        left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      },
      left: {
        top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
        left: triggerRect.left - tooltipRect.width - 8
      }
    };

    setTooltipPosition(positions[position]);
  };

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current !== undefined) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
    }

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipContent = isVisible && (
    <div
      ref={tooltipRef}
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`
      }}
      className={`
        fixed z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg
        ${position === 'top' && 'animate-fade-down'}
        ${position === 'right' && 'animate-fade-left'}
        ${position === 'bottom' && 'animate-fade-up'}
        ${position === 'left' && 'animate-fade-right'}
        ${className}
      `}
      role="tooltip"
    >
      {content}
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && typeof document !== 'undefined' && createPortal(tooltipContent, document.body)}
    </>
  );
};