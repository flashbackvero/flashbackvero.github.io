const CACHE = "particle-simulator-v41";
const SHELL = ["/particle-lab/", "/particle-lab/manifest.webmanifest", "/particle-lab/icon-64.png", "/particle-lab/icon-192.png", "/particle-lab/icon-512.png", "/particle-lab/og-v19.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then((response) => {
      if (response.ok) event.waitUntil(caches.open(CACHE).then((cache) => cache.put("/particle-lab/", response.clone())));
      return response;
    }).catch(() => caches.match("/particle-lab/")));
    return;
  }
  if (url.origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    if (response.ok) event.waitUntil(caches.open(CACHE).then((cache) => cache.put(event.request, response.clone())));
    return response;
  })));
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") { self.skipWaiting(); return; }
  if (event.data?.type !== "CACHE_URLS") return;
  const urls = [...new Set(event.data.urls || [])].filter((url) => {
    try { return new URL(url, self.location.origin).origin === self.location.origin; } catch { return false; }
  });
  event.waitUntil(
    caches.open(CACHE).then((cache) => Promise.all(urls.map(async (url) => {
      try {
        const request = new Request(new URL(url, self.location.origin).href, { credentials: "same-origin" });
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response);
      } catch { /* Keep any previously cached copy. */ }
    }))).then(() => event.source?.postMessage({ type: "OFFLINE_READY" })),
  );
});
