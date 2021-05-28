importScripts("https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js");

var firebaseConfig = {
    apiKey: "AIzaSyCxS_Go6o4rsPo-98dqO_hrr4qYrk5jICs",
    authDomain: "disco-nirvana-296921.firebaseapp.com",
    projectId: "disco-nirvana-296921",
    storageBucket: "disco-nirvana-296921.appspot.com",
    messagingSenderId: "723755294915",
    appId: "1:723755294915:web:e0dc5b2e8864cdb59fc276",
    measurementId: "G-GW0WGRYJPD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
    //   icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
});