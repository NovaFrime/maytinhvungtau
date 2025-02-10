export { Alert, ErrorAlert, SuccessAlert } from './Alert';
export type { AlertProps } from './Alert';

export { Badge, StatusBadge } from './Badge';
export type { BadgeProps } from './Badge';

export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Input } from './Input';
export type { InputProps } from './Input';

export { LoadingSpinner } from './LoadingSpinner';

export { Modal, ConfirmModal } from './Modal';
export type { ModalProps, ConfirmModalProps, ModalSize } from './Modal';

export { Select } from './Select';
export type { SelectProps } from './Select';

export { Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

export const VIETNAMESE_MESSAGES = {
  loading: 'Đang tải...',
  error: 'Đã xảy ra lỗi',
  success: 'Thành công',
  confirm: 'Xác nhận',
  cancel: 'Hủy',
  close: 'Đóng',
  save: 'Lưu',
  edit: 'Sửa',
  delete: 'Xóa',
  search: 'Tìm kiếm',
  filter: 'Lọc',
  sort: 'Sắp xếp',
  select: 'Chọn',
  required: 'Bắt buộc',
  optional: 'Tùy chọn',
  back: 'Quay lại',
  next: 'Tiếp tục',
  submit: 'Gửi',
  create: 'Tạo mới',
  update: 'Cập nhật',
  remove: 'Xóa',
  viewDetails: 'Xem chi tiết',
  addToCart: 'Thêm vào giỏ',
  outOfStock: 'Hết hàng',
  inStock: 'Còn hàng',
  quantity: 'Số lượng',
  totalPrice: 'Tổng tiền',
  shipping: 'Phí vận chuyển',
  freeShipping: 'Miễn phí vận chuyển',
  orderTotal: 'Tổng đơn hàng',
  checkout: 'Thanh toán',
  emptyCart: 'Giỏ hàng trống',
} as const;
