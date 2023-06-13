import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDapivjmTTC9e5y4-Z3MDQJFoYgjo3faHg",
  authDomain: "ejemplo-makaia-front-4.firebaseapp.com",
  projectId: "ejemplo-makaia-front-4",
  storageBucket: "ejemplo-makaia-front-4.appspot.com",
  messagingSenderId: "1041487355071",
  appId: "1:1041487355071:web:b7d8ecfb0c82c96a583a0a",
  measurementId: "G-1Z46168NX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);