// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1BNGmVjC-DDFB8kX_yLivVtQQtRAVUCw",
  authDomain: "restaurants-platform-8159f.firebaseapp.com",
  projectId: "restaurants-platform-8159f",
  storageBucket: "restaurants-platform-8159f.firebasestorage.app",
  messagingSenderId: "141343947834",
  appId: "1:141343947834:web:96196174ee5e576d6d4903",
  measurementId: "G-MZ20HSBTC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);