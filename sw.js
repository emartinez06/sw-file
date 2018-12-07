//Some parts of this code are from Google documentation
//URL: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker

//Let's cache all necessary files (JS, HTML, CSS, Images, Maps, Data)
let files = [
    // Files and root
    '/',
    'index.html',
    'sw.js'
];
let cacheName = 'my-app';

//Install the service worker and open the cache
self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Installing');
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(files);
        }).catch(function(err) {
            console.log('Error on installing: ' + err);
        })
    )
});

//Activate and refresh service worker
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

//Fetch files and save them on storage
self.addEventListener('fetch', function(event) {
    console.log('[ServiceWorker] Fetching files');
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request).then(function(res) {
                    return caches.open(cacheName)
                        .then(function(cache) {

                            //save the response for future
                            cache.put(event.request.url, res.clone());
                            //return the cached data
                            return res;
                        }).catch(function(err){
                            console.log('Error on fetch: ' + err);
                        });
                })
            })
    );
});

//ToDo: add event for service worker messages