import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  const banners = [
    {
      id: 'mua-sam-tet',
      title: 'Mua sắm Tết 2024',
      description: 'Giảm giá đến 20% cho laptop và PC',
      image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      buttonText: 'Xem ngay',
      url: '/san-pham?sale=tet2024'
    },
    {
      id: 'gaming-gear',
      title: 'Gaming Gear',
      description: 'Trang bị gaming chất lượng cao',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      buttonText: 'Khám phá',
      url: '/san-pham?danh-muc=gaming'
    }
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
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-xl text-white">
                  <h1 className="text-5xl font-bold mb-4">
                    {banner.title}
                  </h1>
                  <p className="text-xl mb-8">
                    {banner.description}
                  </p>
                  <Link
                    href={banner.url}
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Miễn phí vận chuyển</h3>
            <p className="text-gray-600">Cho đơn hàng từ 10 triệu đồng</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Bảo hành chính hãng</h3>
            <p className="text-gray-600">12 - 24 tháng tùy sản phẩm</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Tư vấn miễn phí</h3>
            <p className="text-gray-600">Đội ngũ kỹ thuật chuyên nghiệp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;