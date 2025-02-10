'use client';

import { ProductGrid } from '@/components/product/ProductGrid';
import { mockProducts } from '@/lib/mockData';
import Link from 'next/link';

// Filter featured products from mockData
const FEATURED_PRODUCTS = mockProducts.filter((product) => product.featured);

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto flex h-full items-center px-4">
          <div className="max-w-2xl text-white">
            <h1 className="mb-4 text-4xl font-bold">Máy Tính Vũng Tàu</h1>
            <p className="mb-6 text-xl">
              Chuyên cung cấp các sản phẩm công nghệ chính hãng với giá tốt nhất
            </p>
            <div className="space-x-4">
              <a
                href="/san-pham"
                className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                Xem sản phẩm
              </a>
              <a
                href="/lien-he"
                className="inline-block rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-600"
              >
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold">Danh Mục Sản Phẩm</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {['Laptop', 'PC Gaming', 'Linh Kiện', 'Màn Hình'].map(
              (category) => (
                <a
                  key={category}
                  href={`/danh-muc/${category.toLowerCase()}`}
                  className="group relative h-40 overflow-hidden rounded-lg bg-white shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-blue-400">
                      {category}
                    </h3>
                  </div>
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductGrid title="Sản Phẩm Nổi Bật" products={FEATURED_PRODUCTS} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Tại Sao Chọn Máy Tính Vũng Tàu?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: 'Sản Phẩm Chính Hãng',
                description:
                  'Cam kết 100% sản phẩm chính hãng, nguồn gốc rõ ràng',
              },
              {
                title: 'Giá Cả Tốt Nhất',
                description:
                  'Luôn mang đến cho khách hàng mức giá cạnh tranh nhất',
              },
              {
                title: 'Hỗ Trợ 24/7',
                description: 'Đội ngũ nhân viên chuyên nghiệp, tận tình hỗ trợ',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg bg-white p-6 text-center"
              >
                <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
