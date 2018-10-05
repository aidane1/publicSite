const cacheName = "v1";

const cacheAssets = [
  "public/html/offline.html",
  "public/fonts/Evogria.otf",
  "public/js/home.js",
  "/?day=1&offline=true",
  "/?day=2&offline=true",
  "/?day=3&offline=true",
  "/?day=4&offline=true",
  "/?day=5&offline=true",
  "/schedule",
  "/calendar"
]

self.addEventListener("install", e => {
  console.log('installing dumb shit');
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
self.addEventListener("message", function(message) {
  let date = new Date();
  let offSetArray = message.data;
  self.indexedDB.open("skipDays", 1, function(upgradeDB) {
    let store = upgradeDB.createObjectStore("skipDays", {
      keyPath: "id"
    })
    store.put({id: 1, days: offSetArray});
  })
  self.indexedDB.open("skipDays", 1, function(db) {
    console.log("big black cock");
    var tx = db.transaction(['skipDays'], 'readonly');
    var store = tx.objectStore('beverages');
    console.log(store.getAll());
  })

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
    let currentDate = new Date();
    let cacheToGet = 0;
    if (event.request.url.split("?").length === 2) {
      let queryDay = (event.request.url.split("?")[1].split("="));
      if (queryDay[0] == "day") {
        cacheToGet = parseInt(queryDay[1]);
      }
    }
    if (cacheToGet === 0) {
      event.respondWith(fetch(event.request).catch(() => caches.match("public/html/offline.html")));
    } else if (cacheToGet === 1) {
      event.respondWith(fetch(event.request).catch(() => caches.match("/?day=1&offline=true")));
    } else if (cacheToGet === 2) {
      event.respondWith(fetch(event.request).catch(() => caches.match("/?day=2&offline=true")));
    } else if (cacheToGet === 3) {
      event.respondWith(fetch(event.request).catch(() => caches.match("/?day=3&offline=true")));
    } else if (cacheToGet === 4) {
      event.respondWith(fetch(event.request).catch(() => caches.match("/?day=4&offline=true")));
    } else if (cacheToGet === 5) {
      event.respondWith(fetch(event.request).catch(() => caches.match("/?day=5&offline=true")));
    } else if (cacheToGet === 6) {
      event.respondWith(fetch(event.request).catch(() => caches.match("public/html/offline.html")));
    } else {
      event.respondWith(fetch(event.request).catch(() => caches.match("public/html/offline.html")));
    }
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
