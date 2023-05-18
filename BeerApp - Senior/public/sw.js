const cacheData = 'beerApp';
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
          '/index.html',
          '/',
        ])
      )
  );
});

self.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((res) => {
        if (res) {
          return res;
        }

        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});
