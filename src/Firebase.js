// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6uA7v5CTKGx8AAL03-oz49kfK8gBg6VY",
  authDomain: "online-shop-c9962.firebaseapp.com",
  projectId: "online-shop-c9962",
  storageBucket: "online-shop-c9962.appspot.com",
  messagingSenderId: "94688882258",
  appId: "1:94688882258:web:8ea0b0b03d178b288c398b",
  measurementId: "G-6VW4C1NZ8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);