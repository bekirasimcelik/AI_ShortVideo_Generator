// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLICK_FIREBASE_API_KEY,
  authDomain: "ai-short-video-generator-27991.firebaseapp.com",
  projectId: "ai-short-video-generator-27991",
  storageBucket: "ai-short-video-generator-27991.firebasestorage.app",
  messagingSenderId: "232674556635",
  appId: "1:232674556635:web:50fb06ac842c08630faafe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);