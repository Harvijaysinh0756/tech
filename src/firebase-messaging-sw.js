importScripts('https://cdnjs.cloudflare.com/ajax/libs/firebase/11.14.0/firebase-app.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/firebase/11.14.0/firebase-messaging.min.js');

firebase.intilizeApp({
    apiKey: "AIzaSyAnYha1sCm0LSUtUtN4jK_VpwZ1MdFrhEg",
    authDomain: "techx-e7500.firebaseapp.com",
    projectId: "techx-e7500",
    storageBucket: "techx-e7500.appspot.com",
    messagingSenderId: "480045903025",
    appId: "1:480045903025:web:0627b98b5fbabc31f88690",
    measurementId: "G-CQRFGH1CB4"
})
const messaging = firebase.messaging();