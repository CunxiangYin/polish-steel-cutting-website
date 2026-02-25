'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogOut, Home, Eye } from 'lucide-react';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { logout } = await import('@/lib/admin/client-auth');
      logout();
      toast.success('已退出登录');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('退出登录失败');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">网站管理后台</h1>
          <span className="text-sm text-gray-500">普耐斯机电设备</span>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('/', '_blank')}
          >
            <Eye className="h-4 w-4 mr-2" />
            查看网站
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            返回首页
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            退出登录
          </Button>
        </div>
      </div>
    </header>
  );
}