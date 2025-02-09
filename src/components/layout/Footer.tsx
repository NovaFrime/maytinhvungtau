'use client';

import Link from 'next/link';
import { Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Máy Tính Vũng Tàu</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                123 Đường ABC, Phường XYZ, TP. Vũng Tàu
              </p>
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Hotline: 1800.xxxx
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email: contact@maytinhvungtau.com
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Thông Tin</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gioi-thieu" className="hover:text-white">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-hanh" className="hover:text-white">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-van-chuyen" className="hover:text-white">
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-white">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Danh Mục</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/laptop" className="hover:text-white">
                  Laptop
                </Link>
              </li>
              <li>
                <Link href="/pc-gaming" className="hover:text-white">
                  PC Gaming
                </Link>
              </li>
              <li>
                <Link href="/linh-kien" className="hover:text-white">
                  Linh Kiện
                </Link>
              </li>
              <li>
                <Link href="/man-hinh" className="hover:text-white">
                  Màn Hình
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/huong-dan-mua-hang" className="hover:text-white">
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link href="/huong-dan-thanh-toan" className="hover:text-white">
                  Hướng dẫn thanh toán
                </Link>
              </li>
              <li>
                <Link href="/tra-cuu-don-hang" className="hover:text-white">
                  Tra cứu đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-white">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© 2024 Máy Tính Vũng Tàu. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}