// Service Worker - PWA支持
const CACHE_NAME = 'punaise-equipment-v2.1';
const STATIC_CACHE_NAME = 'punaise-static-v2.1';
const DYNAMIC_CACHE_NAME = 'punaise-dynamic-v2.1';

// 需要缓存的核心文件
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/style.min.css',
    '/script.min.js',
    '/optimization-widgets.min.js',
    '/product-search.js',
    '/image-optimization.js',
    '/live-chat.js',
    '/manifest.json',
    '/favicon.svg',
    '/favicon.ico'
];

// 需要缓存的字体和外部资源
const FONT_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 预缓存的图片资源
const IMAGE_ASSETS = [
    '/logo-main.svg',
    '/images/hero-banner.jpg',
    '/images/company-overview.jpg'
];

// 安装事件 - 缓存核心资源
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // 缓存核心静态资源
            caches.open(STATIC_CACHE_NAME).then(cache => {
                console.log('Service Worker: Caching core assets');
                return cache.addAll(CORE_ASSETS);
            }),
            
            // 缓存字体资源
            caches.open(STATIC_CACHE_NAME).then(cache => {
                console.log('Service Worker: Caching font assets');
                return cache.addAll(FONT_ASSETS);
            }),
            
            // 预缓存关键图片
            caches.open(STATIC_CACHE_NAME).then(cache => {
                console.log('Service Worker: Pre-caching images');
                return cache.addAll(IMAGE_ASSETS.filter(Boolean));
            })
        ]).then(() => {
            console.log('Service Worker: Installation complete');
            return self.skipWaiting(); // 立即激活新的SW
        }).catch(error => {
            console.error('Service Worker: Installation failed', error);
        })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // 删除旧版本缓存
                    if (cacheName !== STATIC_CACHE_NAME && 
                        cacheName !== DYNAMIC_CACHE_NAME &&
                        cacheName.startsWith('punaise-')) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activation complete');
            return self.clients.claim(); // 立即控制所有页面
        })
    );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // 忽略Chrome扩展请求
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    // 忽略非GET请求
    if (request.method !== 'GET') {
        return;
    }
    
    event.respondWith(handleFetch(request));
});

// 处理网络请求的核心逻辑
async function handleFetch(request) {
    const url = new URL(request.url);
    
    try {
        // HTML页面 - 网络优先，缓存备用
        if (request.headers.get('accept').includes('text/html')) {
            return await handleHtmlRequest(request);
        }
        
        // 静态资源 - 缓存优先
        if (isStaticAsset(url)) {
            return await handleStaticAsset(request);
        }
        
        // 图片资源 - 缓存优先，网络备用
        if (isImageRequest(request)) {
            return await handleImageRequest(request);
        }
        
        // API请求 - 网络优先，缓存备用
        if (isApiRequest(url)) {
            return await handleApiRequest(request);
        }
        
        // 外部资源 - 缓存优先
        if (isExternalResource(url)) {
            return await handleExternalResource(request);
        }
        
        // 默认策略 - 网络优先
        return await handleDefaultRequest(request);
        
    } catch (error) {
        console.error('Service Worker: Fetch error', error);
        return await handleOfflineResponse(request);
    }
}

// 处理HTML请求 - 网络优先策略
async function handleHtmlRequest(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    
    try {
        // 尝试从网络获取最新版本
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // 缓存最新版本
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        throw new Error('Network response not ok');
    } catch (error) {
        // 网络失败，从缓存获取
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            console.log('Service Worker: Serving HTML from cache');
            return cachedResponse;
        }
        
        // 返回离线页面
        return await handleOfflineResponse(request);
    }
}

// 处理静态资源 - 缓存优先策略
async function handleStaticAsset(request) {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        // 后台更新缓存
        updateCache(request, cache);
        return cachedResponse;
    }
    
    // 缓存中没有，从网络获取并缓存
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('Service Worker: Failed to fetch static asset', error);
        throw error;
    }
}

// 处理图片请求
async function handleImageRequest(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            // 缓存图片，但限制缓存大小
            await manageCacheSize(cache, 50); // 最多50个图片
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // 返回占位图片
        return createPlaceholderResponse();
    }
}

// 处理API请求
async function handleApiRequest(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // 缓存API响应（短期）
            const responseToCache = networkResponse.clone();
            // 为API响应设置较短的过期时间
            addCacheHeaders(responseToCache);
            cache.put(request, responseToCache);
        }
        
        return networkResponse;
    } catch (error) {
        // 网络失败，尝试从缓存获取
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            // 添加离线标识
            const response = cachedResponse.clone();
            response.headers.set('X-Served-By', 'sw-cache');
            return response;
        }
        
        throw error;
    }
}

// 处理外部资源
async function handleExternalResource(request) {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('Service Worker: Failed to fetch external resource', error);
        throw error;
    }
}

// 默认请求处理
async function handleDefaultRequest(request) {
    try {
        return await fetch(request);
    } catch (error) {
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

// 后台更新缓存
async function updateCache(request, cache) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            await cache.put(request, response);
        }
    } catch (error) {
        console.log('Service Worker: Background update failed', error);
    }
}

// 管理缓存大小
async function manageCacheSize(cache, maxItems) {
    const keys = await cache.keys();
    if (keys.length >= maxItems) {
        // 删除最旧的条目
        const oldestKey = keys[0];
        await cache.delete(oldestKey);
    }
}

// 添加缓存头部
function addCacheHeaders(response) {
    response.headers.set('Cache-Control', 'max-age=300'); // 5分钟
    response.headers.set('X-Cache-Timestamp', Date.now().toString());
}

// 创建占位图片响应
function createPlaceholderResponse() {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
            <rect width="300" height="200" fill="#f0f0f0"/>
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
                  fill="#999" font-family="Arial" font-size="16">
                图片加载中...
            </text>
        </svg>
    `;
    
    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-cache'
        }
    });
}

// 处理离线响应
async function handleOfflineResponse(request) {
    const url = new URL(request.url);
    
    // 如果请求的是HTML页面，返回缓存的首页
    if (request.headers.get('accept').includes('text/html')) {
        const cache = await caches.open(STATIC_CACHE_NAME);
        const cachedIndex = await cache.match('/');
        
        if (cachedIndex) {
            return cachedIndex;
        }
    }
    
    // 返回离线消息
    return new Response(
        JSON.stringify({
            message: '您当前处于离线状态，请检查网络连接',
            offline: true,
            timestamp: Date.now()
        }),
        {
            status: 503,
            statusText: 'Service Unavailable',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }
    );
}

// 工具函数 - 检查是否为静态资源
function isStaticAsset(url) {
    return /\\.(css|js|woff|woff2|ttf|eot|svg|ico)$/i.test(url.pathname);
}

// 工具函数 - 检查是否为图片请求
function isImageRequest(request) {
    return request.headers.get('accept').includes('image/') ||
           /\\.(jpg|jpeg|png|gif|webp|svg)$/i.test(new URL(request.url).pathname);
}

// 工具函数 - 检查是否为API请求
function isApiRequest(url) {
    return url.pathname.startsWith('/api/') || 
           url.pathname.includes('/api/') ||
           url.hostname.includes('api.');
}

// 工具函数 - 检查是否为外部资源
function isExternalResource(url) {
    return url.hostname !== self.location.hostname &&
           (url.hostname.includes('googleapis.com') ||
            url.hostname.includes('cdnjs.cloudflare.com') ||
            url.hostname.includes('fonts.gstatic.com'));
}

// 消息处理 - 与页面通信
self.addEventListener('message', event => {
    const { type, data } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'GET_VERSION':
            event.ports[0].postMessage({
                version: CACHE_NAME,
                timestamp: Date.now()
            });
            break;
            
        case 'CLEAN_CACHE':
            cleanupCache().then(() => {
                event.ports[0].postMessage({ success: true });
            }).catch(error => {
                event.ports[0].postMessage({ success: false, error: error.message });
            });
            break;
            
        case 'PRECACHE_URLS':
            precacheUrls(data.urls).then(() => {
                event.ports[0].postMessage({ success: true });
            }).catch(error => {
                event.ports[0].postMessage({ success: false, error: error.message });
            });
            break;
            
        default:
            console.log('Service Worker: Unknown message type', type);
    }
});

// 清理缓存
async function cleanupCache() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name.startsWith('punaise-') && 
        name !== STATIC_CACHE_NAME && 
        name !== DYNAMIC_CACHE_NAME
    );
    
    return Promise.all(oldCaches.map(cache => caches.delete(cache)));
}

// 预缓存URL
async function precacheUrls(urls) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    
    const promises = urls.map(async url => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                await cache.put(url, response);
            }
        } catch (error) {
            console.warn('Service Worker: Failed to precache', url, error);
        }
    });
    
    return Promise.allSettled(promises);
}

// 推送通知处理
self.addEventListener('push', event => {
    const options = {
        body: '我们有新的产品更新！',
        icon: '/images/icon-192x192.png',
        badge: '/images/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 'product-update'
        },
        actions: [
            {
                action: 'explore',
                title: '查看详情',
                icon: '/images/action-explore.png'
            },
            {
                action: 'close',
                title: '关闭',
                icon: '/images/action-close.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('普耐斯机电设备', options)
    );
});

// 通知点击处理
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/?utm_source=push&utm_medium=notification')
        );
    }
});

// 后台同步
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// 执行后台同步
async function doBackgroundSync() {
    try {
        // 这里可以执行后台数据同步
        console.log('Service Worker: Background sync completed');
    } catch (error) {
        console.error('Service Worker: Background sync failed', error);
    }
}

// 周期性后台同步
self.addEventListener('periodicsync', event => {
    if (event.tag === 'periodic-background-sync') {
        event.waitUntil(doPeriodicSync());
    }
});

// 执行周期性同步
async function doPeriodicSync() {
    // 定期检查更新
    try {
        const response = await fetch('/api/version');
        const data = await response.json();
        
        if (data.version !== CACHE_NAME) {
            // 通知用户有新版本可用
            await self.registration.showNotification('版本更新', {
                body: '网站有新版本可用，点击刷新页面',
                icon: '/images/icon-192x192.png'
            });
        }
    } catch (error) {
        console.log('Service Worker: Version check failed', error);
    }
}

console.log('Service Worker: Script loaded', CACHE_NAME);