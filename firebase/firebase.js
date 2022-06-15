// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrAIh6Pd1BKhpSQcLqjnu5HpBHvl1R1FA",
  authDomain: "stream-chat-d417d.firebaseapp.com",
  projectId: "stream-chat-d417d",
  storageBucket: "stream-chat-d417d.appspot.com",
  messagingSenderId: "420970267071",
  appId: "1:420970267071:web:de5f26840bf662f190a10a",
  measurementId: "G-2DX1FB1D26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);