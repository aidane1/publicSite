var getParams = function(url) {
	let urlParams = new URLSearchParams(url)
	return urlParams.get("day");
};



const cacheName = "v99";

const cacheAssets = [
  "public/html/offline.html",
  "public/fonts/Evogria.otf",
  "public/js/home.js",
  "/?day=1&offline=true",
  "/?day=2&offline=true",
  "/?day=3&offline=true",
  "/?day=4&offline=true",
  "/?day=5&offline=true",
  "/?offline=true",
  "/schedule",
  "/calendar",
  "favicon.ico"
]

self.addEventListener("install", e => {
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
  console.log(event.request.url);
  if (event.request.destination === "unknown" || event.request.destination === "document") {
    if (event.request.url === "https://www.pvstudents.ca/" || event.request.url === "https://www.pvstudents.ca" || event.request.url === "http://127.0.0.1:8080/") {
      event.respondWith(fetch(event.request).catch(() => caches.match("/?offline=true")));
    } else if (event.request.url === "https://www.pvstudents.ca/schedule" || event.request === "https://www.pvstudents.ca/calendar") {
      event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    } else {
      event.respondWith(fetch(event.request).catch(() => caches.match("public/html/offline.html")));
    }
  } else if (event.request.destination === "font") {
    // caches.match(event.request).then(function(resp) {
    //   return resp || fetch(event.request).then(function(response) {
    //     return caches.open(cacheName).then(function(cache) {
    //       cache.put(event.request, response.clone());
    //       return response;
    //     });
    //   });
    // })
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
  } else {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
  }

});
self.addEventListener('push', function(e) {
  var data = e.data.json();
  console.log("got push: " + data);
  e.waitUntil(
    self.registration.showNotification(data.title, {body: data.body, icon: "/public/images/icon-128x128.png"})
  );
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;
  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('https://www.pvstudents.ca');
    notification.close();
  }
});
