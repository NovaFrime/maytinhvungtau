'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Đã xảy ra lỗi</h1>
      <p className="text-gray-600 mb-6">Rất tiếc! Đã có lỗi xảy ra khi tải trang.</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={reset}
      >
        Thử lại
      </button>
    </div>
  );
}