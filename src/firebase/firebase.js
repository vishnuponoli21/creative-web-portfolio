// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey:
    "AIzaSyAYVUPQp7nZSHY9oKtBraAcFXjm9Mnxdv8AIzaSyAYVUPQp7nZSHY9oKtBraAcFXjm9Mnxdv8",
  authDomain: "vishnu-portfolio-ba4a5.firebaseapp.com",
  projectId: "vishnu-portfolio-ba4a5",
  storageBucket: "vishnu-portfolio-ba4a5.firebasestorage.app",
  messagingSenderId: "313467326463",
  appId: "1:313467326463:web:e26accf3a1ee6b20e5a1ca",
  measurementId: "G-QCPTT5S772",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore (for contact form later)
const db = getFirestore(app);

// Analytics (safe init)
let analytics = null;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics, db };
