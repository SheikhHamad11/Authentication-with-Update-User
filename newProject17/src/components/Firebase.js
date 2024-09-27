// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from 'firebase/messaging';
// import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaZtqZK1WTLr33Ycu9q5TXR8zOnuWqXTk",
    authDomain: "new-app-d8565.firebaseapp.com",
    projectId: "new-app-d8565",
    storageBucket: "new-app-d8565.appspot.com",
    messagingSenderId: "940797699192",
    appId: "1:940797699192:web:5126894a6c699ce231f98d"
  };
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage=getStorage(app)
const messaging = getMessaging(app);
export { auth, db,storage,messaging }
