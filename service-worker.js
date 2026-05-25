importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBgXWZkH0WMjhGmOfxjqbIDoJHlyA1pc-o",
  authDomain: "roadsidehero-104ea.firebaseapp.com",
  databaseURL: "https://roadsidehero-104ea-default-rtdb.firebaseio.com",
  projectId: "roadsidehero-104ea",
  storageBucket: "roadsidehero-104ea.appspot.com",
  messagingSenderId: "1068443635940",
  appId: "1:1068443635940:web:ae5e33d3fe0d78c415dcf1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title || 'RoadWatch Hero';
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || '/roadwatchlogo.png',
        badge: '/roadwatchlogo.png',
        data: payload.data
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes('/home.html') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/home.html');
            }
        })
    );
});

const CACHE_NAME = 'roadwatch-cache-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/Appindex.html',
    '/home.html',
    '/hub.html',
    '/jobboard.html',
    '/driver.html',
    '/manifest.json',
    '/roadwatchlogo.png',
    '/pwa-192x192.png',
    '/maskable-icon-512x512.png',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheAllowlist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
