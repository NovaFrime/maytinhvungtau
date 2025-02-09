import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Máy Tính Vũng Tàu - Chuyên Laptop, PC Gaming & Linh Kiện Chính Hãng',
  description: 'Cung cấp laptop, PC gaming, và linh kiện máy tính chính hãng với giá tốt nhất tại Vũng Tàu. Đảm bảo chất lượng, hậu mãi chu đáo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full">
      <body className={`${inter.className} flex min-h-full flex-col`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
