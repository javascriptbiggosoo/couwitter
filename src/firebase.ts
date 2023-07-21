// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDot48FhN2754CPMPHk1OhuSM4pn7RgRaY",
  authDomain: "couwitter-11858.firebaseapp.com",
  projectId: "couwitter-11858",
  storageBucket: "couwitter-11858.appspot.com",
  messagingSenderId: "489835413995",
  appId: "1:489835413995:web:2bff911fd23b4097ab99ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);

export default app;
