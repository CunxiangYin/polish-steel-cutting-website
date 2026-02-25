'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Package,
  Settings,
  FileText,
  Image,
  Briefcase,
  Building,
} from 'lucide-react';

const menuItems = [
  {
    href: '/admin',
    label: '仪表板',
    icon: Home,
  },
  {
    href: '/admin/hero',
    label: '首页横幅',
    icon: FileText,
  },
  {
    href: '/admin/products',
    label: '产品管理',
    icon: Package,
  },
  {
    href: '/admin/services',
    label: '服务管理',
    icon: Briefcase,
  },
  {
    href: '/admin/company',
    label: '公司信息',
    icon: Building,
  },
  {
    href: '/admin/media',
    label: '媒体库',
    icon: Image,
  },
  {
    href: '/admin/settings',
    label: '系统设置',
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-65px)]">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}