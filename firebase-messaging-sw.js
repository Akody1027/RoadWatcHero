importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBgXWZkH0WMjhGmOfxjqbIDoJHlyA1pc-o",
  authDomain: "roadsidehero-104ea.firebaseapp.com",
  projectId: "roadsidehero-104ea",
  storageBucket: "roadsidehero-104ea.firebasestorage.app",
  messagingSenderId: "1068443635940", // <-- From Firebase Settings
  appId: "1:1068443635940:web:ae5e33d3fe0d78c415dcf1" // <-- From Firebase Settings
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title || 'New RoadWatcHero Alert';
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/roadwatchlogo.png' 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});