'use client';

import { Fragment, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { LoadingSpinner } from './LoadingSpinner';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  isLoading?: boolean;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export interface ConfirmModalProps extends Omit<ModalProps, 'children'> {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  isLoading = false,
  closeOnOverlayClick = true,
  showCloseButton = true,
}: ModalProps) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const content = (
    <Fragment>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
        onClick={handleOverlayClick}
      />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full ${sizes[size]}`}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="px-6 py-4 border-b border-gray-200">
                {title && (
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="relative">
              {children}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                  <LoadingSpinner size="lg" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};

export const ConfirmModal = ({
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'danger',
  ...props
}: ConfirmModalProps) => {
  const variants = {
    danger: {
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      icon: 'text-red-600'
    },
    warning: {
      button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      icon: 'text-yellow-600'
    },
    info: {
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      icon: 'text-blue-600'
    }
  };

  return (
    <Modal size="sm" {...props}>
      <div className="p-6">
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${variants[variant].icon}`}>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={props.onClose}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant].button}`}
            onClick={() => {
              onConfirm();
              props.onClose();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};