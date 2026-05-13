/* =========================
   FIREBASE CONFIG
========================= */
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxi4ANyUszdpTJN8zyrUNnv0zdpb_htF8",
  authDomain: "roadwise-b4acc.firebaseapp.com",
  projectId: "roadwise-b4acc",
  storageBucket: "roadwise-b4acc.firebasestorage.app",
  messagingSenderId: "121998583319",
  appId: "1:121998583319:web:b820b695b363000c2bde52"
};

self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
/* =========================
   INITIALIZE FIREBASE
========================= */

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

firebase.appCheck().activate(
    "6LcgsecsAAAAALZAHMb5nlXcWR098vACcw4sSzMl",
    true
);