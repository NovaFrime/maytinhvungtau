'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  alignment?: 'left' | 'center' | 'right';
  overlay?: 'dark' | 'light' | 'gradient' | 'none';
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/hero/gaming-laptops.jpg',
    title: 'Gaming Laptops',
    subtitle: 'Unleash Your Gaming Potential',
    description: 'Experience next-level gaming with our premium selection of gaming laptops',
    buttonText: 'Shop Gaming Laptops',
    buttonLink: '/category/gaming-laptops',
    buttonVariant: 'primary',
    alignment: 'left',
    overlay: 'gradient'
  },
  {
    id: 2,
    image: '/images/hero/workstations.jpg',
    title: 'Professional Workstations',
    subtitle: 'Power Your Productivity',
    description: 'High-performance workstations for demanding professionals',
    buttonText: 'Explore Workstations',
    buttonLink: '/category/workstations',
    buttonVariant: 'outline',
    alignment: 'center',
    overlay: 'dark'
  },
  {
    id: 3,
    image: '/images/hero/special-offers.jpg',
    title: 'Special Offers',
    subtitle: 'Limited Time Deals',
    description: 'Save big on selected products with our exclusive promotions',
    buttonText: 'View Deals',
    buttonLink: '/promotions',
    buttonVariant: 'secondary',
    alignment: 'right',
    overlay: 'light'
  }
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const previousSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getOverlayClass = (overlay: Slide['overlay']) => {
    switch (overlay) {
      case 'dark':
        return 'bg-black/50';
      case 'light':
        return 'bg-white/30';
      case 'gradient':
        return 'bg-gradient-to-r from-black/60 via-black/30 to-transparent';
      default:
        return '';
    }
  };

  const getAlignmentClass = (alignment: Slide['alignment']) => {
    switch (alignment) {
      case 'left':
        return 'text-left items-start';
      case 'right':
        return 'text-right items-end';
      default:
        return 'text-center items-center';
    }
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`
            absolute inset-0 transition-opacity duration-500
            ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          `}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className={`absolute inset-0 ${getOverlayClass(slide.overlay)}`} />
          </div>

          {/* Content */}
          <div className="relative h-full">
            <div className={`
              container mx-auto px-4 h-full
              flex flex-col justify-center
              ${getAlignmentClass(slide.alignment)}
            `}>
              <div className="max-w-xl">
                <span className="inline-block text-white text-lg font-medium mb-2 animate-fade-in-up">
                  {slide.subtitle}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up animation-delay-150">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in-up animation-delay-300">
                  {slide.description}
                </p>
                <div className="animate-fade-in-up animation-delay-450">
                  <Link href={slide.buttonLink}>
                    <Button
                      variant={slide.buttonVariant || 'primary'}
                      size="lg"
                    >
                      {slide.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};