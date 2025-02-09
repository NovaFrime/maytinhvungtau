'use client';

import { ProductGrid } from '@/components/product/ProductGrid';
import Link from 'next/link';

// This would typically come from your database
const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Laptop Gaming Acer Nitro 5 AN515-57-5669 NH.QEHSV.001',
    slug: 'laptop-gaming-acer-nitro-5-an515',
    description: 'Laptop Gaming Acer Nitro 5 với CPU Intel Core i5-11400H, RAM 8GB, SSD 512GB',
    price: 19990000,
    originalPrice: 22990000,
    images: ['/images/products/acer-nitro-5.jpg'],
    category: 'laptop',
    subcategory: 'gaming',
    brand: 'Acer',
    specifications: {
      cpu: 'Intel Core i5-11400H',
      ram: '8GB DDR4',
      storage: '512GB NVMe SSD',
      gpu: 'NVIDIA RTX 3050 4GB',
      display: '15.6" FHD IPS 144Hz',
    },
    stock: 10,
    rating: 4.5,
    reviewCount: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more sample products here
];

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold mb-4">
              Máy Tính Vũng Tàu
            </h1>
            <p className="text-xl mb-6">
              Chuyên cung cấp các sản phẩm công nghệ chính hãng với giá tốt nhất
            </p>
            <div className="space-x-4">
              <a
                href="/san-pham"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Xem sản phẩm
              </a>
              <a
                href="/lien-he"
                className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Danh Mục Sản Phẩm</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Laptop', 'PC Gaming', 'Linh Kiện', 'Màn Hình'].map((category) => (
              <a
                key={category}
                href={`/danh-muc/${category.toLowerCase()}`}
                className="group relative h-40 bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                    {category}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ProductGrid
            title="Sản Phẩm Nổi Bật"
            products={FEATURED_PRODUCTS}
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Tại Sao Chọn Máy Tính Vũng Tàu?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Sản Phẩm Chính Hãng',
                description: 'Cam kết 100% sản phẩm chính hãng, nguồn gốc rõ ràng',
              },
              {
                title: 'Giá Cả Tốt Nhất',
                description: 'Luôn mang đến cho khách hàng mức giá cạnh tranh nhất',
              },
              {
                title: 'Hỗ Trợ 24/7',
                description: 'Đội ngũ nhân viên chuyên nghiệp, tận tình hỗ trợ',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-lg text-center"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
