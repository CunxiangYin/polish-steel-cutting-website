'use client';

import { useEffect, useState, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin/client-auth';

/**
 * Loading spinner component
 */
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <span className="text-gray-500 text-sm">验证登录状态...</span>
      </div>
    </div>
  );
}

/**
 * Higher-Order Component for admin authentication
 * Wraps a component to require authentication before rendering
 *
 * Usage:
 * ```tsx
 * function MyAdminPage() {
 *   return <div>Protected content</div>;
 * }
 *
 * export default withAuth(MyAdminPage);
 * ```
 */
export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: {
    redirectTo?: string;
    loadingComponent?: ComponentType;
  }
) {
  const { redirectTo = '/admin/login', loadingComponent: LoadingComponent = LoadingSpinner } = options || {};

  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const [isAuthed, setIsAuthed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Check authentication status
      if (!isAuthenticated()) {
        router.push(redirectTo);
        return;
      }

      setIsAuthed(true);
      setIsLoading(false);
    }, [router]);

    // Show loading state while checking auth
    if (isLoading) {
      return <LoadingComponent />;
    }

    // Don't render if not authenticated (redirect will happen)
    if (!isAuthed) {
      return null;
    }

    // Render the wrapped component
    return <WrappedComponent {...props} />;
  };
}

/**
 * Custom hook for authentication check
 * Can be used in components that need to conditionally render based on auth status
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { isAuthenticated, isLoading } = useAuth();
 *
 *   if (isLoading) return <Spinner />;
 *   if (!isAuthenticated) return <LoginPrompt />;
 *
 *   return <ProtectedContent />;
 * }
 * ```
 */
export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuth = () => {
      const authed = isAuthenticated();
      setAuthState({
        isAuthenticated: authed,
        isLoading: false,
      });
    };

    checkAuth();
  }, []);

  const redirectToLogin = () => {
    router.push('/admin/login');
  };

  return {
    ...authState,
    redirectToLogin,
  };
}

export default withAuth;
