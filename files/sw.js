// /**
//  * Copyright 2015 Google Inc. All rights reserved.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  *
//  */
//
// (function() {
//   var nativeAddAll = Cache.prototype.addAll;
//   var userAgent = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);
//
//   // Has nice behavior of `var` which everyone hates
//   if (userAgent) {
//     var agent = userAgent[1];
//     var version = parseInt(userAgent[2]);
//   }
//
//   if (
//     nativeAddAll && (!userAgent ||
//       (agent === 'Firefox' && version >= 46) ||
//       (agent === 'Chrome'  && version >= 50)
//     )
//   ) {
//     return;
//   }
//
//   Cache.prototype.addAll = function addAll(requests) {
//     var cache = this;
//
//     // Since DOMExceptions are not constructable:
//     function NetworkError(message) {
//       this.name = 'NetworkError';
//       this.code = 19;
//       this.message = message;
//     }
//
//     NetworkError.prototype = Object.create(Error.prototype);
//
//     return Promise.resolve().then(function() {
//       if (arguments.length < 1) throw new TypeError();
//
//       // Simulate sequence<(Request or USVString)> binding:
//       var sequence = [];
//
//       requests = requests.map(function(request) {
//         if (request instanceof Request) {
//           return request;
//         }
//         else {
//           return String(request); // may throw TypeError
//         }
//       });
//
//       return Promise.all(
//         requests.map(function(request) {
//           if (typeof request === 'string') {
//             request = new Request(request);
//           }
//
//           var scheme = new URL(request.url).protocol;
//
//           if (scheme !== 'http:' && scheme !== 'https:') {
//             throw new NetworkError("Invalid scheme");
//           }
//
//           return fetch(request.clone());
//         })
//       );
//     }).then(function(responses) {
//       // If some of the responses has not OK-eish status,
//       // then whole operation should reject
//       if (responses.some(function(response) {
//         return !response.ok;
//       })) {
//         throw new NetworkError('Incorrect response status');
//       }
//
//       // TODO: check that requests don't overwrite one another
//       // (don't think this is possible to polyfill due to opaque responses)
//       return Promise.all(
//         responses.map(function(response, i) {
//           return cache.put(requests[i], response);
//         })
//       );
//     }).then(function() {
//       return undefined;
//     });
//   };
//
//   Cache.prototype.add = function add(request) {
//     return this.addAll([request]);
//   };
// }());
const cacheName = "v1";
const cacheAssets = {
  "serviceTest/home.html"
}


self.addEventListener("install", e => {
  console.log("service worker: installed");
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("service worker: caching files");
      cache.addAll(cacheAssets);
    }).then(() => self.skipWaiting());
  )
});

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

self.addEventListener("fetch", e => {
  console.log("service worker: fetching");
  e.respondWith(
    fetch(e.request).then(res => {
      const resClone = res.clone();
      caches.open(cacheName).then(cache => {
        cache.put(e.request, resClone);
      });
      return res;
    }).catch(err => caches.match(e.request).then(res => res));
  );
});
