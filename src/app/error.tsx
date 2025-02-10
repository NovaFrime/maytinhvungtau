'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-4xl font-bold">Đã xảy ra lỗi</h1>
      <p className="mb-6 text-gray-600">
        Rất tiếc! Đã có lỗi xảy ra khi tải trang.
      </p>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        onClick={reset}
      >
        Thử lại
      </button>
    </div>
  );
}
