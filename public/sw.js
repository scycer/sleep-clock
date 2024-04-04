// public/sw.js

// Cache name
const CACHE_NAME = 'v1';
// Assets to cache
const assetsToCache = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/manifest.json',
    // Add other assets here, like CSS/JS/images
];

// Installing Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(assetsToCache);
            })
    );
});

// Fetching assets
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});
