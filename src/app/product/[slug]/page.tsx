'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/mockData';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

type TabType = 'description' | 'specifications' | 'reviews';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts.find((p) => p.slug === params.slug);
  const { addItem, isInCart, getItemQuantity } = useCart();
  const { formatProductPrice, getRelatedProducts, isProductInStock } = useProducts({ products: mockProducts });
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>('description');

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    if (isProductInStock(product)) {
      addItem(product, selectedQuantity);
    }
  };

  const renderStockStatus = () => {
    switch (product.stockStatus) {
      case 'in_stock':
        return <Badge variant="success">In Stock ({product.stock} available)</Badge>;
      case 'low_stock':
        return <Badge variant="warning">Low Stock (Only {product.stock} left)</Badge>;
      case 'out_of_stock':
        return <Badge variant="danger">Out of Stock</Badge>;
      case 'discontinued':
        return <Badge variant="secondary">Discontinued</Badge>;
    }
  };

  const renderRatingStars = (rating: number) => (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'fill-current' : 'fill-gray-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );

  const tabs: { id: TabType; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex mb-8 text-sm text-gray-500">
        <a href="/products" className="hover:text-blue-600">Products</a>
        <span className="mx-2">/</span>
        <a href={`/category/${product.category.slug}`} className="hover:text-blue-600">
          {product.category.name}
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <ProductImageGallery
          images={product.images}
          alt={product.name}
          aspectRatio="square"
          enableZoom
          thumbnailPosition="bottom"
        />

        {/* Product Info */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <p className="text-gray-600">{product.brand.name}</p>
              <span className="text-gray-300">|</span>
              <p className="text-gray-600">SKU: {product.sku}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              {renderRatingStars(product.rating)}
              <span className="text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold text-blue-600">
                {formatProductPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-xl text-gray-500 line-through">
                  {formatProductPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-gray-700 mb-6">{product.shortDescription}</p>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              {renderStockStatus()}
            </div>

            {/* Quantity Selector */}
            {isProductInStock(product) && (
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                  className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!isProductInStock(product)}
                fullWidth
                size="lg"
              >
                {!isProductInStock(product) ? 'Out of Stock' :
                 isInCart(product.id) ? `Update Cart (${getItemQuantity(product.id)} in cart)` : 'Add to Cart'}
              </Button>

              <Button
                variant="outline"
                fullWidth
                size="lg"
                disabled={!isProductInStock(product)}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-16">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex border-b border-gray-200 py-3">
                  <span className="font-medium text-gray-900 w-1/3">{key}</span>
                  <span className="text-gray-600 w-2/3">{value.toString()}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {product.reviews.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-2">
                        {renderRatingStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-600">
                          {review.userName}
                        </span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <ProductGrid products={relatedProducts} columns={{ sm: 2, md: 3, lg: 4 }} />
        </div>
      )}
    </div>
  );
}