'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin/client-auth';

export function useAuth(requireAuth: boolean = true) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const authed = isAuthenticated();
      setIsAuthed(authed);
      
      if (requireAuth && !authed && !pathname?.includes('/admin/login')) {
        router.push('/admin/login');
      } else if (!requireAuth && authed && pathname?.includes('/admin/login')) {
        router.push('/admin');
      }
      
      setIsLoading(false);
    };

    checkAuth();

    // Check auth on storage change (for logout from other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [requireAuth, router, pathname]);

  return { isLoading, isAuthenticated: isAuthed };
}