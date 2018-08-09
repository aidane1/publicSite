const cacheName = "v2";

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
        console.log(caches);
      })
      .then(() => self.skipWaiting())
  );
});


self.addEventListener("activate", e => {
  console.log("service worker: activated");
  console.log(caches.open("v1"));
  e.waitUntil(
    caches.keys().then(cacheNames => {
      console.log(cacheNames);
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("deleting old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );

});

self.addEventListener("fetch", e => {
  console.log("service worker: fetching");
  console.log(caches.match(e.request));
  // console.log(e.request);
  // e.respondWith(
  //   caches.match(e.request)
  // )
});
