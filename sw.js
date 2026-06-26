// sw.js — 마리수학 Service Worker
const VERSION = 'v3';
const CACHE = `marimath-${VERSION}`;

const ASSETS = [
  './index.html',
  './manifest.json',
  './css/base.css',
  './css/screens.css',
  './js/theme.js',
  './js/mascot.js',
  './js/state.js',
  './js/canvas.js',
  './js/coach.js',
  './js/app.js',
  './data/units.js',
  './data/q_fracdiv.js',
  './data/q_decdiv.js',
  './data/q_prism.js',
  './data/q_m1a.js',
  './data/q_m1b.js',
  './data/index.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // API는 캐시 안 함 (항상 네트워크)
  if (url.pathname.includes('/api/')) return;
  // 그 외: 네트워크 우선, 실패 시 캐시
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
