var CACHE = 'mnq-risk-v1';
var FILES = [
  '/mnq-risk-Fx/',
  '/mnq-risk-Fx/index.html',
  '/mnq-risk-Fx/manifest.json',
  '/mnq-risk-Fx/icono-192.png',
  '/mnq-risk-Fx/icono-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).catch(function() {
        return caches.match('/mnq-risk-Fx/index.html');
      });
    })
  );
});
