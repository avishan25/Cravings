// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "yum-411ec.firebaseapp.com",
  projectId: "yum-411ec",
  storageBucket: "yum-411ec.firebasestorage.app",
  messagingSenderId: "952329085768",
  appId: "1:952329085768:web:adffc421a09a31796c897d",
  measurementId: "G-RXB9W57ZNF",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googlep =new GoogleAuthProvider();
