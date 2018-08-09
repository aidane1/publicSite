
console.log("test");
const cacheName = "v2";



self.addEventListener("install", e => {
  console.log("service worker: installed");
});
//
self.addEventListener("activate", e => {
  console.log("service worker: activated");
  //remove unwanted caches
  e.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(cache => {
      if (cache !== cacheName) {
        console.log("deleting old cache");
        return caches.delete(cache);
      }
    }));
  }));
});
//
// self.addEventListener("fetch", e => {
//   console.log("service worker: fetching");
//   e.respondWith(
//     fetch(e.request).then(res => {
//       const resClone = res.clone();
//       caches.open(cacheName).then(cache => {
//         cache.put(e.request, resClone);
//       });
//       return res;
//     }).catch(err => caches.match(e.request).then(res => res));
//   );
// });
