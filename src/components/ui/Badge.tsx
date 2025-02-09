import { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

export const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  rounded = false
}: BadgeProps) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  };

  return (
    <span 
      className={`
        inline-flex items-center font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${rounded ? 'rounded-full' : 'rounded'}
      `}
    >
      {children}
    </span>
  );
};

export const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
    active: { label: 'Hoạt động', variant: 'success' },
    inactive: { label: 'Ngừng hoạt động', variant: 'danger' },
    pending: { label: 'Chờ xử lý', variant: 'warning' },
    draft: { label: 'Nháp', variant: 'secondary' },
    published: { label: 'Đã đăng', variant: 'success' },
    archived: { label: 'Đã lưu trữ', variant: 'default' }
  };

  const config = statusConfig[status] || { label: status, variant: 'default' };

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};

export default Badge;