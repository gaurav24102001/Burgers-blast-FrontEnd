// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCn1zgLU2bkRAV4CjhuywdSwS41N7-sPv8",
  authDomain: "burger-blast-auth.firebaseapp.com",
  projectId: "burger-blast-auth",
  storageBucket: "burger-blast-auth.appspot.com",
  messagingSenderId: "343687286099",
  appId: "1:343687286099:web:7bc6135ed8b990e71725a6",
  measurementId: "G-QLQT88B6CD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {app,auth};
