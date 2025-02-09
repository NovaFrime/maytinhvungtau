'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  enableZoom?: boolean;
  thumbnailPosition?: 'bottom' | 'left';
}

export const ProductImageGallery = ({
  images,
  alt,
  aspectRatio = 'square',
  enableZoom = true,
  thumbnailPosition = 'bottom'
}: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableZoom || !mainImageRef.current) return;

    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (enableZoom) {
      setIsZoomed(true);
    }
  };

  const handleMouseLeave = () => {
    if (enableZoom) {
      setIsZoomed(false);
    }
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') previousImage();
        if (e.key === 'Escape') setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const renderMainImage = () => (
    <div
      ref={mainImageRef}
      className={`relative w-full ${aspectRatioClasses[aspectRatio]} overflow-hidden rounded-lg bg-gray-100`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsLightboxOpen(true)}
    >
      <Image
        src={images[selectedIndex]}
        alt={`${alt} - Image ${selectedIndex + 1}`}
        fill
        className={`
          object-contain transition-transform duration-300
          ${isZoomed ? 'scale-150' : 'scale-100'}
          cursor-zoom-in
        `}
        style={isZoomed ? {
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
        } : undefined}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={selectedIndex === 0}
      />
      
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); previousImage(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );

  const renderThumbnails = () => (
    <div className={`
      flex gap-2 mt-4
      ${thumbnailPosition === 'left' ? 'flex-col' : 'flex-row overflow-x-auto'}
    `}>
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => setSelectedIndex(index)}
          className={`
            relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden
            ${selectedIndex === index ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'}
          `}
        >
          <Image
            src={image}
            alt={`${alt} - Thumbnail ${index + 1}`}
            fill
            className="object-cover"
            sizes="64px"
          />
        </button>
      ))}
    </div>
  );

  const renderLightbox = () => (
    <Modal
      isOpen={isLightboxOpen}
      onClose={() => setIsLightboxOpen(false)}
      size="full"
    >
      <div className="relative h-screen flex items-center justify-center bg-black">
        <Image
          src={images[selectedIndex]}
          alt={`${alt} - Image ${selectedIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </Modal>
  );

  return (
    <div className={`
      flex
      ${thumbnailPosition === 'left' ? 'flex-row gap-4' : 'flex-col'}
    `}>
      {thumbnailPosition === 'left' && images.length > 1 && renderThumbnails()}
      <div className="flex-grow">
        {renderMainImage()}
        {thumbnailPosition === 'bottom' && images.length > 1 && renderThumbnails()}
      </div>
      {renderLightbox()}
    </div>
  );
};