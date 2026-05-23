importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyBgXWZkH0WMjhGmOfxjqbIDoJHlyA1pc-o",
  authDomain: "roadsidehero-104ea.firebaseapp.com",
  databaseURL: "https://roadsidehero-104ea-default-rtdb.firebaseio.com",
  projectId: "roadsidehero-104ea",
  storageBucket: "roadsidehero-104ea.firebasestorage.app",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/roadwatchlogo.png",
    badge: "/roadwatchlogo.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});