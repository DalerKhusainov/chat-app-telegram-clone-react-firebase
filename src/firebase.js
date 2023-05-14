import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeqqlE_RjPvbMr1-IzudHqFOlX7fiHzdg",
  authDomain: "chat-app-telegram-clone-react.firebaseapp.com",
  projectId: "chat-app-telegram-clone-react",
  storageBucket: "chat-app-telegram-clone-react.appspot.com",
  messagingSenderId: "361276058854",
  appId: "1:361276058854:web:41f385241b311b4fd31f27",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
