const CACHE_NAME = 'my-site-cache-v1';
const OFFLINE_URL = '/templates/offline.html'; // Path to your offline.html

// Files to cache
const urlsToCache = [
  '/',
  '/offline', // Cache the offline.html file
  // Add other static assets (CSS, JS, images) here
];

// Install the service worker and cache the required files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache); // Cache the files
      })
  );
});

// Serve cached files or fetch from the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return the cached response if found
        if (response) {
          return response;
        }

        // Fetch from the network
        return fetch(event.request).then((response) => {
          // Check if the response is valid
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cache the fetched response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      }).catch(() => {
        // If the network request fails, serve the offline.html page
        return caches.match(OFFLINE_URL);
      })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});