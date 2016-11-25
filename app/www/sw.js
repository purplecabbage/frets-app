
self.addEventListener('install', function(event) {
  // Perform install steps
  console.log("service worker is installing");
});

self.addEventListener('activate', function(event) {
  // Perform activate steps
  console.log("service worker is activated");
});