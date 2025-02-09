import { ReactNode } from 'react';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
}

const defaultTitles = {
  info: 'Thông tin',
  success: 'Thành công',
  warning: 'Cảnh báo',
  error: 'Lỗi'
};

const styles = {
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  success: 'bg-green-50 text-green-800 border-green-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  error: 'bg-red-50 text-red-800 border-red-200'
};

const iconStyles = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400'
};

export const Alert = ({ type = 'info', title, children }: AlertProps) => {
  return (
    <div className={`rounded-lg border p-4 ${styles[type]}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertIcon type={type} />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">
            {title || defaultTitles[type]}
          </h3>
          <div className="mt-2 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

const AlertIcon = ({ type }: { type: AlertProps['type'] }) => {
  return (
    <svg
      className={`h-5 w-5 ${iconStyles[type || 'info']}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      {type === 'error' && (
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      )}
      {type === 'warning' && (
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      )}
      {type === 'info' && (
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      )}
      {type === 'success' && (
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      )}
    </svg>
  );
};

export const ErrorAlert = ({ children }: { children: ReactNode }) => (
  <Alert type="error">{children}</Alert>
);

export const SuccessAlert = ({ children }: { children: ReactNode }) => (
  <Alert type="success">{children}</Alert>
);

export default Alert;