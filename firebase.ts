import  "firebase/auth";
import { getAuth } from "firebase/auth";
import {initializeApp} from "firebase/app";
import firebase from 'firebase/compat/app'
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
export const app=initializeApp(firebaseConfig)
firebase.initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const db=getFirestore(app)

export default firebase

