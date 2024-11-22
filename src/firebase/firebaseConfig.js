// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { setLogLevel } from 'firebase/firestore';

setLogLevel('debug');


// Firebase configuration (as provided)
const firebaseConfig = {
  apiKey: "AIzaSyBNFE0vq2zhp4YVH7mInpCiqQ9pvUceXT8",
  authDomain: "sociaflare-connect.firebaseapp.com",
  projectId: "sociaflare-connect",
  storageBucket: "sociaflare-connect.firebasestorage.app",
  messagingSenderId: "59660958001",
  appId: "1:59660958001:web:d18967df6d0010d8b39810",
  measurementId: "G-430GBX29M6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export initialized services
export { app, firebaseConfig, analytics, auth, db, storage };
