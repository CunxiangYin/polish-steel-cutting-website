// Admin API client - communicates with Netlify Functions

const AUTH_TOKEN_KEY = 'admin_auth_token';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

// Content API
export async function getContent<T = unknown>(type: string): Promise<T | null> {
  try {
    const res = await fetch(`/api/content/${type}`, { headers: authHeaders() });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to get content: ${res.status}`);
    const json = await res.json();
    return json.data as T;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return null;
  }
}

export async function saveContent(type: string, data: unknown): Promise<boolean> {
  try {
    const res = await fetch(`/api/content/${type}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ data }),
    });
    if (!res.ok) throw new Error(`Failed to save content: ${res.status}`);
    return true;
  } catch (error) {
    console.error(`Error saving ${type}:`, error);
    return false;
  }
}

export async function triggerDeploy(): Promise<boolean> {
  try {
    const res = await fetch('/api/deploy', {
      method: 'POST',
      headers: authHeaders(),
    });
    return res.ok;
  } catch (error) {
    console.error('Error triggering deploy:', error);
    return false;
  }
}

// Save content and trigger deploy
export async function saveAndDeploy(type: string, data: unknown): Promise<{ saved: boolean; deployed: boolean }> {
  const saved = await saveContent(type, data);
  let deployed = false;
  if (saved) {
    deployed = await triggerDeploy();
  }
  return { saved, deployed };
}

// Image Upload API
export async function uploadImage(
  file: File | Blob,
  fileName: string,
  category: string = 'other'
): Promise<{ success: boolean; path?: string; error?: string }> {
  try {
    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        fileName,
        fileData: base64,
        contentType: file.type || 'image/jpeg',
        category,
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error || '上传失败' };
    }

    return { success: true, path: json.path };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: '网络错误' };
  }
}
