export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
      <p className="text-gray-600">Đang tải dữ liệu...</p>
    </div>
  );
}
