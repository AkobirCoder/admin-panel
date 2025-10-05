// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDvTclaIR8Fo07sJeqS2PUDdG2ibhodVg",
  authDomain: "bilimac-fcfc3.firebaseapp.com",
  projectId: "bilimac-fcfc3",
  storageBucket: "bilimac-fcfc3.appspot.com",
  messagingSenderId: "988247274787",
  appId: "1:988247274787:web:b9f1668b1a007834d44896",
  measurementId: "G-8TZX7BGW7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
