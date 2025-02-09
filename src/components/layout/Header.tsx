'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CartPreview } from '@/components/cart/CartPreview';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { useCart } from '@/hooks/useCart';
import { SITE_CONFIG, NAV_LINKS } from '@/constants';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, User, Phone, MapPin } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useCartStore } from '@/store/cart';
import { SUPPORT_LINKS, MAIN_CATEGORIES } from '@/constants';

export const Header = () => {
  const pathname = usePathname();
  const { getSummary } = useCart();
  const { itemCount } = getSummary();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartPreviewOpen(false);
  }, [pathname]);

  const handleKeyPress = (e: KeyboardEvent) => {
    // Open search on Cmd/Ctrl + K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsSearchOpen(true);
    }
    // Close modals on Escape
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setIsCartPreviewOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-blue-600 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                {SUPPORT_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center hover:text-blue-200"
                  >
                    {link.title.includes('showroom') && <MapPin className="h-4 w-4 mr-1" />}
                    {link.title.includes('Hotline') && <Phone className="h-4 w-4 mr-1" />}
                    {link.title}
                  </a>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/dang-nhap" className="hover:text-blue-200">
                  Đăng nhập
                </Link>
                <Link href="/dang-ky" className="hover:text-blue-200">
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={`bg-white transition-colors ${isScrolled ? '' : 'bg-opacity-95'}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  {SITE_CONFIG.name}
                </h1>
              </Link>

              {/* Main Navigation */}
              <NavigationMenu>
                <NavigationMenuList>
                  {MAIN_CATEGORIES.map((category) => (
                    <NavigationMenuItem key={category.href}>
                      <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory.href}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={subcategory.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {subcategory.title}
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              {/* User Actions */}
              <div className="flex items-center space-x-4">
                <Link href="/tai-khoan">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/gio-hang" className="relative">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300
            ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`
              fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="space-y-4">
                {NAV_LINKS.main.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2 text-sm font-medium ${
                      pathname === link.href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Overlays */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <CartPreview
        isOpen={isCartPreviewOpen}
        onClose={() => setIsCartPreviewOpen(false)}
      />

      {/* Spacer for fixed header */}
      <div className="h-[104px]" /> {/* Adjust height based on header height */}
    </>
  );
};