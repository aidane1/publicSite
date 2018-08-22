const cacheName = "v5";

const cacheAssets = [
  "public/html/offline.html",
  "public/fonts/Evogria.otf"
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
  console.log("service worker: activated");;
  e.waitUntil(
    caches.keys().then(cacheNames => {
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
self.addEventListener("fetch", event => {

  console.log("service worker: fetching");
  if (event.request.destination == "font" && event.request.referrer.split("/")[event.request.referrer.split("/").length-1] != "fonts") {
    // e.respondWith(caches.match(e.request).catch(() => {
    //   return fetch(e.request);
    // }))
    // e.respondWith(caches.match(e.request).catch(() => fetch(e.request)))
    // e.respondWith(fetch(e.request));
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        console.log("fuckin yeet.");
        return caches.open(cacheName).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
    // e.respondWith(
    //   caches.match(e.request).then(function(response) {
    //     console.log(response);
    //     return caches.open(cacheName).then(function(cache) {
    //       if (e.request.url.indexOf('test') < 0) {
    //         cache.put(e.request.url, response.clone());
    //       }
    //       return response;
    //     });
    //   })
    // );

  } else {
    event.respondWith(fetch(event.request).catch(() => caches.match("public/html/offline.html")));
  }


});
