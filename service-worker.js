const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    './',  // Ensure your root index.html is accessible
    './index.html',
    './products.js',
    './manifest.json',
    './style.css', // Make sure this file exists
    './icon-192x192.png', // Ensure these paths are correct
    './icon-512x512.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch(error => console.error('Failed to cache:', error)) // Log any errors
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetching files
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return the cached response if found, else fetch from network
                return response || fetch(event.request).catch(() => {
                    // If both fail, you could return a fallback response here
                    console.error('Network fetch failed for:', event.request.url);
                    return new Response('Network error occurred', {
                        status: 404,
                        statusText: 'Not Found'
                    });
                });
            })
    );
});

