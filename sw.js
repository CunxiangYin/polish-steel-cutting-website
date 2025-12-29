// Service Worker - PWA support
const CACHE_NAME = 'punaise-equipment-v2.1';
const STATIC_CACHE_NAME = 'punaise-static-v2.1';
const DYNAMIC_CACHE_NAME = 'punaise-dynamic-v2.1';

// Core files to cache
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

// Fonts and external resources to cache
const FONT_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Pre-cached image assets
const IMAGE_ASSETS = [
    '/logo-main.svg',
    '/images/hero-banner.jpg',
    '/images/company-overview.jpg'
];

// Install event - cache core resources
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache core static assets
            caches.open(STATIC_CACHE_NAME).then(cache => {
                console.log('Service Worker: Caching core assets');
                return cache.addAll(CORE_ASSETS);
            }),
            
            // Cache font assets
            caches.open(STATIC_CACHE_NAME).then(cache => {
                console.log('Service Worker: Caching font assets');
                return cache.addAll(FONT_ASSETS);
            }),
            
            // Pre-cache critical images
            caches.open(STATIC_CACHE_NAME).then(cache => {
                console.log('Service Worker: Pre-caching images');
                return cache.addAll(IMAGE_ASSETS.filter(Boolean));
            })
        ]).then(() => {
            console.log('Service Worker: Installation complete');
            return self.skipWaiting(); // Immediately activate new SW
        }).catch(error => {
            console.error('Service Worker: Installation failed', error);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Delete old version caches
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
            return self.clients.claim(); // Immediately control all pages
        })
    );
});

// Intercept network requests
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignore Chrome extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    // Ignore non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    event.respondWith(handleFetch(request));
});

// Core logic for handling network requests
async function handleFetch(request) {
    const url = new URL(request.url);
    
    try {
        // HTML pages - network first, cache fallback
        if (request.headers.get('accept').includes('text/html')) {
            return await handleHtmlRequest(request);
        }
        
        // Static assets - cache first
        if (isStaticAsset(url)) {
            return await handleStaticAsset(request);
        }
        
        // Image resources - cache first, network fallback
        if (isImageRequest(request)) {
            return await handleImageRequest(request);
        }
        
        // API requests - network first, cache fallback
        if (isApiRequest(url)) {
            return await handleApiRequest(request);
        }
        
        // External resources - cache first
        if (isExternalResource(url)) {
            return await handleExternalResource(request);
        }
        
        // Default strategy - network first
        return await handleDefaultRequest(request);
        
    } catch (error) {
        console.error('Service Worker: Fetch error', error);
        return await handleOfflineResponse(request);
    }
}

// Handle HTML requests - network first strategy
async function handleHtmlRequest(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    
    try {
        // Try to get latest version from network
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache latest version
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        throw new Error('Network response not ok');
    } catch (error) {
        // Network failed, get from cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            console.log('Service Worker: Serving HTML from cache');
            return cachedResponse;
        }
        
        // Return offline page
        return await handleOfflineResponse(request);
    }
}

// Handle static assets - cache first strategy
async function handleStaticAsset(request) {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        // Update cache in background
        updateCache(request, cache);
        return cachedResponse;
    }
    
    // Not in cache, fetch from network and cache
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

// Handle image requests
async function handleImageRequest(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            // Cache image, but limit cache size
            await manageCacheSize(cache, 50); // Maximum 50 images
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // Return placeholder image
        return createPlaceholderResponse();
    }
}

// Handle API requests
async function handleApiRequest(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache API response (short term)
            const responseToCache = networkResponse.clone();
            // Set shorter expiration time for API response
            addCacheHeaders(responseToCache);
            cache.put(request, responseToCache);
        }
        
        return networkResponse;
    } catch (error) {
        // Network failed, try to get from cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            // Add offline identifier
            const response = cachedResponse.clone();
            response.headers.set('X-Served-By', 'sw-cache');
            return response;
        }
        
        throw error;
    }
}

// Handle external resources
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

// Default request handling
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

// Background cache update
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

// Manage cache size
async function manageCacheSize(cache, maxItems) {
    const keys = await cache.keys();
    if (keys.length >= maxItems) {
        // Delete oldest entry
        const oldestKey = keys[0];
        await cache.delete(oldestKey);
    }
}

// Add cache headers
function addCacheHeaders(response) {
    response.headers.set('Cache-Control', 'max-age=300'); // 5 minutes
    response.headers.set('X-Cache-Timestamp', Date.now().toString());
}

// Create placeholder image response
function createPlaceholderResponse() {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
            <rect width="300" height="200" fill="#f0f0f0"/>
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
                  fill="#999" font-family="Arial" font-size="16">
                Loading image...
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

// Handle offline response
async function handleOfflineResponse(request) {
    const url = new URL(request.url);
    
    // If requesting HTML page, return cached homepage
    if (request.headers.get('accept').includes('text/html')) {
        const cache = await caches.open(STATIC_CACHE_NAME);
        const cachedIndex = await cache.match('/');
        
        if (cachedIndex) {
            return cachedIndex;
        }
    }
    
    // Return offline message
    return new Response(
        JSON.stringify({
            message: 'You are currently offline, please check your network connection',
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

// Utility function - check if static asset
function isStaticAsset(url) {
    return /\\.(css|js|woff|woff2|ttf|eot|svg|ico)$/i.test(url.pathname);
}

// Utility function - check if image request
function isImageRequest(request) {
    return request.headers.get('accept').includes('image/') ||
           /\\.(jpg|jpeg|png|gif|webp|svg)$/i.test(new URL(request.url).pathname);
}

// Utility function - check if API request
function isApiRequest(url) {
    return url.pathname.startsWith('/api/') || 
           url.pathname.includes('/api/') ||
           url.hostname.includes('api.');
}

// Utility function - check if external resource
function isExternalResource(url) {
    return url.hostname !== self.location.hostname &&
           (url.hostname.includes('googleapis.com') ||
            url.hostname.includes('cdnjs.cloudflare.com') ||
            url.hostname.includes('fonts.gstatic.com'));
}

// Message handling - communicate with page
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

// Clean up cache
async function cleanupCache() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name.startsWith('punaise-') && 
        name !== STATIC_CACHE_NAME && 
        name !== DYNAMIC_CACHE_NAME
    );
    
    return Promise.all(oldCaches.map(cache => caches.delete(cache)));
}

// Precache URLs
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

// Push notification handling
self.addEventListener('push', event => {
    const options = {
        body: 'We have new product updates!',
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
                title: 'View Details',
                icon: '/images/action-explore.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/images/action-close.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Punaise Electromechanical Equipment', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/?utm_source=push&utm_medium=notification')
        );
    }
});

// Background sync
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Execute background sync
async function doBackgroundSync() {
    try {
        // Background data sync can be executed here
        console.log('Service Worker: Background sync completed');
    } catch (error) {
        console.error('Service Worker: Background sync failed', error);
    }
}

// Periodic background sync
self.addEventListener('periodicsync', event => {
    if (event.tag === 'periodic-background-sync') {
        event.waitUntil(doPeriodicSync());
    }
});

// Execute periodic sync
async function doPeriodicSync() {
    // Periodically check for updates
    try {
        const response = await fetch('/api/version');
        const data = await response.json();
        
        if (data.version !== CACHE_NAME) {
            // Notify user that new version is available
            await self.registration.showNotification('Version Update', {
                body: 'New website version available, click to refresh page',
                icon: '/images/icon-192x192.png'
            });
        }
    } catch (error) {
        console.log('Service Worker: Version check failed', error);
    }
}

console.log('Service Worker: Script loaded', CACHE_NAME);