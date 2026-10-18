const CACHE_NAME = 'TPA Fathul Huda';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Tahap Install: Menyimpan aset ke cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Tahap Fetch: Mengambil aset dari cache jika offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
