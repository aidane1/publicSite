const cacheName = "v1";

const cacheAssets = [
  "public/html/offline.html"
]

self.addEventListener("install", e => {
  console.log("service worker: installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("service worker: Caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});


self.addEventListener("activate", e => {
  console.log("service worker: activated");
});
