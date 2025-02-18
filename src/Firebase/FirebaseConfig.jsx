// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCF-fOv6d8ODqplDiEqjJyWkC1vCGvKpS4",
  authDomain: "react-x-shopping-auth.firebaseapp.com",
  databaseURL: "https://react-x-shopping-auth-default-rtdb.firebaseio.com",
  projectId: "react-x-shopping-auth",
  storageBucket: "react-x-shopping-auth.firebasestorage.app",
  messagingSenderId: "1097212959667",
  appId: "1:1097212959667:web:fbc119620599c99b3b09c6",
  measurementId: "G-C1V9ENQC1P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database };
