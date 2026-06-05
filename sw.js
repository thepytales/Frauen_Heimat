const CACHE_NAME = 'heimatfront-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Installieren und Dateien in den Cache laden
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache geöffnet');
        return cache.addAll(urlsToCache);
      })
  );
});

// Anfragen abfangen und aus dem Cache beantworten (Offline-Modus)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache-Treffer: Liefere die gespeicherte Version
        if (response) {
          return response;
        }
        // Kein Cache-Treffer: Lade aus dem Internet
        return fetch(event.request);
      })
  );
});

// Alte Caches aufräumen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
