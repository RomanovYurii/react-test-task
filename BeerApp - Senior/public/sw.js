const cacheData = 'appV1';
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(cacheData)
      .then((cache) =>
        cache.addAll([
          '/favicon.ico',
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
          'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css',
          'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js',
          'static/js/bundle.js',
          '/logo192.png',
          '/logo512.png',
          '/manifest.json',
          '/index.html',
          '/beer',
          '/',
        ])
      )
  );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
});
