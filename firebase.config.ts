// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzaYOpxDgYiWDNAnQD_12gWyw5NL5zUbM",
  authDomain: "clonexbazar.firebaseapp.com",
  databaseURL: "https://clonexbazar-default-rtdb.firebaseio.com",
  projectId: "clonexbazar",
  storageBucket: "clonexbazar.firebasestorage.app",
  messagingSenderId: "5709022516",
  appId: "1:5709022516:web:a6a0e1d8297f1b23a51161",
  measurementId: "G-4SZKG5G3B5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };