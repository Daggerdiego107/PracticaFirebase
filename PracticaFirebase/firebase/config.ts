import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZg16oUKHliOLo4ybwBGCtlQvVBazKWVA",
  authDomain: "practicafirebase-c6fa0.firebaseapp.com",
  projectId: "practicafirebase-c6fa0",
  storageBucket: "practicafirebase-c6fa0.firebasestorage.app",
  messagingSenderId: "935163649854",
  appId: "1:935163649854:web:1bdf78058657af002c566f",
  measurementId: "G-4K341GDMHR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);