



this.addEventListener('install', function(event) {
  // Perform install steps
  console.log("service worker is installing");

  setTimeout(function() {
    console.log("10 seconds later, I'm still here.")
  },10000)
  // event.waitUntil(
  //   caches.open('v3').then(function(cache) {
  //     return cache.addAll([
  //       '/css/',
  //       '/css/framework7.ios.colors.css',
  //       '/css/framework7.ios.min.css',
  //       '/css/framework7.ios.colors.min.css',
  //       '/css/fretsApp.css',
  //       '/css/framework7.ios.css',
  //       '/js/',
  //       '/js/TunedInstrument.js',
  //       '/js/framework7.js',
  //       '/js/fretsApp.js',
  //       '/js/chords.js',
  //       '/js/framework7.min.js',
  //       '/lib/',
  //       '/lib/raphael-min.js',
  //       '/img/',
  //       '/img/adirondack_spruce_5_cup.jpg',
  //       '/img/debut_dark.png',
  //       '/img/icon192.png',
  //       '/img/debut_dark_@2X.png',
  //       '/img/icon48.png',
  //       '/img/herringbone.png',
  //       '/img/icon96.png',
  //       '/sounds/',
  //       '/sounds/AccGuitar.wav',
  //       'index.html'
  //     ]);
  //   })
  // );
});

this.addEventListener('activate', function(event) {
  // Perform activate steps
  console.log("service worker is activated");
});

this.addEventListener('fetch', function(event) {
  console.log("fetch : " + event.request.url);
  // event.respondWith(
  //   caches.match(event.request)
  // );
});

this.addEventListener("onupdatefound",function(evt){
  console.log("update founded");

});


