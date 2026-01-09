'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '@/lib/admin/client-auth';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export default function AdminLayout({
  children,
  title,
  description,
  actions
}: AdminLayoutProps) {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setIsAuthed(true);
    } else {
      router.push('/admin/login');
      return;
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      logout();
      router.push('/admin/login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          加载中...
        </div>
      </div>
    );
  }

  if (!isAuthed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4">
            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 rounded-md text-sm flex items-center gap-1 transition-colors"
              >
                ← 返回
              </button>

              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">
                  {title}
                </h1>
                {description && (
                  <p className="text-gray-500 text-sm mt-0.5">
                    {description}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              {actions}

              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
