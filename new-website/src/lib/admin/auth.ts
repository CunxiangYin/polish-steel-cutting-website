import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// 硬编码的管理员账号
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: '19870424' // 实际使用时应该使用环境变量
};

// 简单的token（实际应该使用JWT）
const ADMIN_TOKEN = 'admin-token-2024';

export async function verifyAuth(request?: NextRequest): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token');
  
  if (request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader === `Bearer ${ADMIN_TOKEN}`) {
      return true;
    }
  }
  
  return token?.value === ADMIN_TOKEN;
}

export async function login(username: string, password: string): Promise<boolean> {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const cookieStore = await cookies();
    cookieStore.set('admin-token', ADMIN_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    return true;
  }
  return false;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin-token');
}