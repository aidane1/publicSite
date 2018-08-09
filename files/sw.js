
const cacheName = "v2";

const cacheAssets = [
  "public/html/offline.html"
];

const offlineUrl = 'public/html/offline.html';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("service worker: caching files");
      cache.addAll(cacheAssets);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  console.log("service  worker: Activated");
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

self.addEventListener("fetch", e => {
  console.log("service worker: fetching");
  console.log(caches);
  console.log(caches.match(e.request));
  e.respondWith(fetch(e.request).catch(() => {
      console.log(e.request);
      console.log(caches);
      caches.match(e.request);
  }));
});



// this.addEventListener('fetch', event => {
//   // request.mode = navigate isn't supported in all browsers
//   // so include a check for Accept: text/html header.
//   if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
//         event.respondWith(
//           fetch(event.request.url).catch(error => {
//               // Return the offline page
//               return caches.match(offlineUrl);
//           })
//     );
//   }
//   else{
//         // Respond with everything else if we can
//         event.respond With(caches.match(event.request)
//                         .then(function (response) {
//                         return response || fetch(event.request);
//                     })
//             );
//       }
// });
