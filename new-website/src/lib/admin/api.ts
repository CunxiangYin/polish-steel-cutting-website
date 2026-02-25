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
