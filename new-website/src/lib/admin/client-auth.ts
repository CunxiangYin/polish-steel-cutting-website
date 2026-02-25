// 客户端认证模块 - 使用服务端 API 验证
// 安全改进: 凭据不再存储在前端代码中

const AUTH_TOKEN_KEY = 'admin_auth_token';
const SESSION_KEY = 'admin_session';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
const REMEMBER_ME_TIMEOUT = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface SessionData {
  token: string;
  loginTime: number;
  lastActivity: number;
  rememberMe: boolean;
  username: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
  code?: string;
}

export interface AdminLogEntry {
  timestamp: number;
  action: string;
  details: Record<string, unknown>;
  username: string;
}

// ============================================
// Session Management
// ============================================

// Get session data from localStorage
export function getSession(): SessionData | null {
  if (typeof window === 'undefined') return null;

  try {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;
    return JSON.parse(sessionStr);
  } catch {
    return null;
  }
}

// Save session to localStorage
function saveSession(session: SessionData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(AUTH_TOKEN_KEY, session.token);
}

// Clear session from localStorage
function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

// Update last activity timestamp
function updateLastActivity(): void {
  if (typeof window === 'undefined') return;

  const session = getSession();
  if (session) {
    session.lastActivity = Date.now();
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
}

// ============================================
// Authentication Functions
// ============================================

// Check if user is authenticated (local check + optional server verify)
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  const session = getSession();
  if (!session || !session.token) return false;

  // Check session timeout locally first
  const timeout = session.rememberMe ? REMEMBER_ME_TIMEOUT : SESSION_TIMEOUT;
  const isExpired = Date.now() - session.loginTime > timeout;

  if (isExpired) {
    logout();
    return false;
  }

  // Update last activity
  updateLastActivity();

  return true;
}

// Verify token with server (for sensitive operations)
export async function verifyToken(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const session = getSession();
  if (!session || !session.token) return false;

  try {
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`,
      },
      body: JSON.stringify({ token: session.token }),
    });

    const data = await response.json();

    if (!data.valid) {
      // Token is invalid, clear session
      clearSession();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    // On network error, fall back to local check
    return isAuthenticated();
  }
}

// Login with username and password
export async function login(
  username: string,
  password: string,
  rememberMe: boolean = false
): Promise<LoginResult> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, rememberMe }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || '登录失败',
        code: data.code,
      };
    }

    // Create and save session
    const session: SessionData = {
      token: data.token,
      loginTime: Date.now(),
      lastActivity: Date.now(),
      rememberMe,
      username: data.username || username,
    };

    saveSession(session);

    // Log login action
    logAdminAction('login', { username, rememberMe });

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: '网络错误，请检查连接后重试',
      code: 'NETWORK_ERROR',
    };
  }
}

// Logout
export function logout(): void {
  if (typeof window === 'undefined') return;

  logAdminAction('logout', {});
  clearSession();
}

// ============================================
// Session Info
// ============================================

// Get session info for display
export function getSessionInfo(): { username: string; loginTime: string; sessionDuration: string } | null {
  const session = getSession();
  if (!session) return null;

  const loginDate = new Date(session.loginTime);
  const duration = Math.floor((Date.now() - session.loginTime) / 1000 / 60);

  return {
    username: session.username,
    loginTime: loginDate.toLocaleString('zh-CN'),
    sessionDuration: duration < 60
      ? `${duration} 分钟`
      : `${Math.floor(duration / 60)} 小时 ${duration % 60} 分钟`
  };
}

// ============================================
// Admin Action Logging
// ============================================

const ADMIN_LOG_KEY = 'admin_action_log';
const MAX_LOG_ENTRIES = 100;

export function logAdminAction(action: string, details: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  try {
    const session = getSession();
    const log: AdminLogEntry = {
      timestamp: Date.now(),
      action,
      details,
      username: session?.username || 'unknown'
    };

    const logs = getAdminLogs();
    logs.unshift(log);

    // Keep only the last MAX_LOG_ENTRIES
    if (logs.length > MAX_LOG_ENTRIES) {
      logs.splice(MAX_LOG_ENTRIES);
    }

    localStorage.setItem(ADMIN_LOG_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to log admin action:', error);
  }
}

export function getAdminLogs(): AdminLogEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const logsStr = localStorage.getItem(ADMIN_LOG_KEY);
    if (!logsStr) return [];
    return JSON.parse(logsStr);
  } catch {
    return [];
  }
}

export function clearAdminLogs(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_LOG_KEY);
}

// ============================================
// Account Lockout (handled by server, but keep for UI)
// ============================================

export function isAccountLocked(): { locked: boolean; remainingTime?: number } {
  // Account lockout is now handled by the server
  // This function is kept for backwards compatibility
  return { locked: false };
}
