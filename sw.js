const CACHE_NAME = 'tpa-fathul-huda-v3';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './Logo%20App.png'
];

// 1. Tahap Install: Langsung aktifkan Service Worker terbaru tanpa menunggu
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// 2. Tahap Activate: Hapus semua cache lama ("TPA Fathul Huda") yang bikin nyangkut
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Tahap Fetch: Utamakan ambil versi terbaru dari internet (Network-First), 
// jika offline baru ambil dari cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
