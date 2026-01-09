'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminLogs, AdminLogEntry } from '@/lib/admin/client-auth';

interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  description: string;
  descriptionEn: string;
  isActive: boolean;
}

interface SearchResult {
  type: 'product' | 'log' | 'page';
  id: string;
  title: string;
  subtitle: string;
  path?: string;
  icon: 'product' | 'log' | 'page';
}

const ADMIN_PAGES = [
  { id: 'hero', title: '首页编辑', subtitle: '编辑首页横幅、标题和统计数据', path: '/admin/hero' },
  { id: 'products', title: '产品管理', subtitle: '添加、编辑和删除产品信息', path: '/admin/products' },
  { id: 'services', title: '服务管理', subtitle: '管理服务内容和描述', path: '/admin/services' },
  { id: 'about', title: '公司信息', subtitle: '更新公司简介和联系方式', path: '/admin/about' },
  { id: 'images', title: '图片管理', subtitle: '管理网站图片资源', path: '/admin/images' },
  { id: 'data', title: '数据管理', subtitle: '数据导出导入和备份管理', path: '/admin/data' },
];

const ACTION_LABELS: Record<string, string> = {
  'login': '登录系统',
  'logout': '退出系统',
  'save_products': '保存产品',
  'add_product': '添加产品',
  'delete_product': '删除产品',
  'duplicate_product': '复制产品',
  'save_services': '保存服务',
  'add_service': '添加服务',
  'delete_service': '删除服务',
  'duplicate_service': '复制服务',
  'save_about': '保存公司信息',
  'save_hero': '保存首页内容',
  'save_images': '保存图片',
  'add_image': '添加图片',
  'update_image': '更新图片',
  'delete_image': '删除图片',
  'export_data': '导出数据',
  'import_data': '导入数据',
  'create_backup': '创建备份',
  'restore_backup': '恢复备份',
  'delete_backup': '删除备份',
  'clear_all_data': '清空数据',
};

export default function GlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load data and search
  const performSearch = useCallback((term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    const searchLower = term.toLowerCase();
    const newResults: SearchResult[] = [];

    // Search pages
    ADMIN_PAGES.forEach(page => {
      if (
        page.title.toLowerCase().includes(searchLower) ||
        page.subtitle.toLowerCase().includes(searchLower)
      ) {
        newResults.push({
          type: 'page',
          id: page.id,
          title: page.title,
          subtitle: page.subtitle,
          path: page.path,
          icon: 'page',
        });
      }
    });

    // Search products
    try {
      const productsData = localStorage.getItem('products_content');
      if (productsData) {
        const products: Product[] = JSON.parse(productsData);
        products.forEach(product => {
          if (
            product.name.toLowerCase().includes(searchLower) ||
            product.nameEn.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.descriptionEn.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower)
          ) {
            newResults.push({
              type: 'product',
              id: product.id,
              title: product.name,
              subtitle: `${product.category} - ${product.isActive ? '已启用' : '已禁用'}`,
              path: '/admin/products',
              icon: 'product',
            });
          }
        });
      }
    } catch (e) {
      console.error('Failed to search products:', e);
    }

    // Search logs
    const logs = getAdminLogs();
    logs.slice(0, 20).forEach((log: AdminLogEntry) => {
      const actionLabel = ACTION_LABELS[log.action] || log.action;
      if (
        actionLabel.toLowerCase().includes(searchLower) ||
        log.username.toLowerCase().includes(searchLower)
      ) {
        newResults.push({
          type: 'log',
          id: log.timestamp.toString(),
          title: actionLabel,
          subtitle: `${log.username} - ${new Date(log.timestamp).toLocaleString('zh-CN')}`,
          path: '/admin/data',
          icon: 'log',
        });
      }
    });

    setResults(newResults.slice(0, 10)); // Limit to 10 results
    setSelectedIndex(0);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchTerm('');
        setResults([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation in results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigateToResult(results[selectedIndex]);
    }
  };

  const navigateToResult = (result: SearchResult) => {
    if (result.path) {
      router.push(result.path);
    }
    setIsOpen(false);
    setSearchTerm('');
    setResults([]);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    performSearch(value);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const getIcon = (type: 'product' | 'log' | 'page') => {
    switch (type) {
      case 'product':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'log':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'page':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
    }
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">搜索...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-200 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 transition-opacity" />

            {/* Modal */}
            <div
              ref={containerRef}
              className="inline-block w-full max-w-xl mt-16 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-xl"
            >
              {/* Search Input */}
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="搜索页面、产品、操作记录..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-12 pr-4 py-4 text-lg border-b border-gray-200 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <kbd className="px-2 py-1 text-xs font-medium bg-gray-100 rounded">ESC</kbd>
                </button>
              </div>

              {/* Results */}
              {searchTerm && (
                <div className="max-h-96 overflow-y-auto">
                  {results.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>未找到 &ldquo;{searchTerm}&rdquo; 相关结果</p>
                    </div>
                  ) : (
                    <div className="py-2">
                      {results.map((result, index) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          onClick={() => navigateToResult(result)}
                          className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                            index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            result.type === 'product' ? 'bg-green-100 text-green-600' :
                            result.type === 'log' ? 'bg-purple-100 text-purple-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {getIcon(result.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{result.title}</div>
                            <div className="text-sm text-gray-500 truncate">{result.subtitle}</div>
                          </div>
                          <div className="text-xs text-gray-400">
                            {result.type === 'product' ? '产品' :
                             result.type === 'log' ? '日志' : '页面'}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quick Links when no search */}
              {!searchTerm && (
                <div className="p-4">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">快速访问</div>
                  <div className="space-y-1">
                    {ADMIN_PAGES.slice(0, 4).map((page, index) => (
                      <button
                        key={page.id}
                        onClick={() => {
                          router.push(page.path);
                          setIsOpen(false);
                        }}
                        className={`w-full px-3 py-2 flex items-center gap-3 text-left rounded-lg transition-colors ${
                          index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          {getIcon('page')}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{page.title}</div>
                          <div className="text-xs text-gray-500">{page.subtitle}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border rounded">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-white border rounded">↓</kbd>
                    导航
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border rounded">↵</kbd>
                    选择
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border rounded">ESC</kbd>
                  关闭
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
