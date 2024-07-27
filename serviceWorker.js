const staticName = "Dr-nobody"
const assets = [
  "/",
  "/templates/master.html",
  "/templates/index.html",
  "/templates/download.html",
  "/templates/upload.html",
  "/static/css/style.css",
  "/static/css/components.css",
  "/static/css/upload.css",
  "/static/css/files.css",
  "/static/js/script.js",
  "/static/js/config.js",
  "/static/js/files.js",
  "/static/js/firebase.js",
  "/static/js/helper.js",
  "/static/js/upload.js",
  "/static/js/validation.js",
  "/static/js/user.js",

  "/static/images/icon-192x192.png",
  "/static/images/icon-256x256.png",
  "/static/images/icon-384x384.png",
  "/static/images/icon-512x512.png",
  "/static/images/profile.jpg",
  "/static/images/*.*",
  "/static/files/*.*",
 

]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticName).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }