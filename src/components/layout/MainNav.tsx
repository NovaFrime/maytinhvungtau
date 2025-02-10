'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Phone, MapPin, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const topNavItems = [
  {
    label: 'Hệ thống showroom',
    icon: MapPin,
    href: '/showrooms',
  },
  {
    label: 'Hotline: 1800.6975',
    icon: Phone,
    href: 'tel:18006975',
  },
];

const mainNavItems = [
  {
    label: 'Khuyến mãi',
    href: '/khuyen-mai',
  },
  {
    label: 'Đơn hàng',
    href: '/don-hang',
  },
  {
    label: 'Tài khoản',
    href: '/tai-khoan',
  },
];

const categories = [
  {
    label: 'Laptop & Máy tính',
    href: '/danh-muc/laptop-may-tinh',
    subcategories: [
      { label: 'Laptop văn phòng', href: '/danh-muc/laptop-van-phong' },
      { label: 'Laptop gaming', href: '/danh-muc/laptop-gaming' },
      { label: 'PC văn phòng', href: '/danh-muc/pc-van-phong' },
      { label: 'PC gaming', href: '/danh-muc/pc-gaming' },
    ],
  },
  {
    label: 'Linh kiện máy tính',
    href: '/danh-muc/linh-kien-may-tinh',
    subcategories: [
      { label: 'CPU', href: '/danh-muc/cpu' },
      { label: 'Mainboard', href: '/danh-muc/mainboard' },
      { label: 'RAM', href: '/danh-muc/ram' },
      { label: 'SSD', href: '/danh-muc/ssd' },
    ],
  },
  // Add more categories as needed
];

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm">
      {/* Top Navigation */}
      <div className="container mx-auto flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center space-x-6">
          {topNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center text-sm text-gray-600 hover:text-primary"
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-600 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            MayTinhVungTau
          </Link>

          {/* Categories Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Menu className="mr-2 h-4 w-4" />
                  Danh mục sản phẩm
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <div key={category.href} className="space-y-2">
                        <NavigationMenuLink
                          href={category.href}
                          className="block font-medium"
                        >
                          {category.label}
                        </NavigationMenuLink>
                        <ul className="space-y-1">
                          {category.subcategories.map((sub) => (
                            <li key={sub.href}>
                              <NavigationMenuLink
                                href={sub.href}
                                className="block text-sm text-gray-500 hover:text-primary"
                              >
                                {sub.label}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="mx-6 flex-1">
            <input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
