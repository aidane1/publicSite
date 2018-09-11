const cacheName = "v2";

const cacheAssets = [
  "public/html/offline.html",
  "public/fonts/Evogria.otf",
  "public/js/home.js"
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


  if (event.request.destination == "font" && event.request.referrer.split("/")[event.request.referrer.split("/").length-1] != "fonts") {


    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {

        return caches.open(cacheName).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })


  } else if(event.request.destination == "script") {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
  } else {
    event.respondWith(fetch(event.request).catch(() => caches.match("public/html/offline.html")));
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
