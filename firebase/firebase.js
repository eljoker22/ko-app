// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWzDQ7wWA9q6up2RYvK_YUMXMNYRqfvYM",
  authDomain: "ko-sports.firebaseapp.com",
  projectId: "ko-sports",
  storageBucket: "ko-sports.appspot.com",
  messagingSenderId: "850273771373",
  appId: "1:850273771373:web:e37ed6389475f5d07ec464",
  measurementId: "G-SW53BR0EMY"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);