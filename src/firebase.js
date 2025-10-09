import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDvTclaIR8Fo07sJeqS2PUDdG2ibhodVg",
  authDomain: "bilimac-fcfc3.firebaseapp.com",
  projectId: "bilimac-fcfc3",
  storageBucket: "bilimac-fcfc3.appspot.com",
  messagingSenderId: "988247274787",
  appId: "1:988247274787:web:b9f1668b1a007834d44896",
  measurementId: "G-8TZX7BGW7W"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, storage, db, ref, uploadBytes, getDownloadURL };
