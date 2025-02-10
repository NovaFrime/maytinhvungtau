'use client';

import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  const banners = [
    {
      id: 'mua-sam-tet',
      title: 'Mua sắm Tết 2024',
      description: 'Giảm giá đến 20% cho laptop và PC',
      image:
        'https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      buttonText: 'Xem ngay',
      url: '/san-pham?sale=tet2024',
    },
    {
      id: 'gaming-gear',
      title: 'Gaming Gear',
      description: 'Trang bị gaming chất lượng cao',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      buttonText: 'Khám phá',
      url: '/san-pham?danh-muc=gaming',
    },
  ];

  return (
    <div className="w-full">
      <div className="relative">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative h-[500px] w-full overflow-hidden"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
              <div className="container mx-auto flex h-full items-center px-4">
                <div className="max-w-xl text-white">
                  <h1 className="mb-4 text-5xl font-bold">{banner.title}</h1>
                  <p className="mb-8 text-xl">{banner.description}</p>
                  <Link
                    href={banner.url}
                    className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    {banner.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-blue-50 p-6">
            <h3 className="mb-2 text-xl font-semibold">Miễn phí vận chuyển</h3>
            <p className="text-gray-600">Cho đơn hàng từ 10 triệu đồng</p>
          </div>
          <div className="rounded-lg bg-green-50 p-6">
            <h3 className="mb-2 text-xl font-semibold">Bảo hành chính hãng</h3>
            <p className="text-gray-600">12 - 24 tháng tùy sản phẩm</p>
          </div>
          <div className="rounded-lg bg-purple-50 p-6">
            <h3 className="mb-2 text-xl font-semibold">Tư vấn miễn phí</h3>
            <p className="text-gray-600">Đội ngũ kỹ thuật chuyên nghiệp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
