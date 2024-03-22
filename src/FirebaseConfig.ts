import { initializeApp } from 'firebase/app';
import  { initializeAuth, browserLocalPersistence } from 'firebase/auth';


//   collection,
//   addDoc,
//   doc,
//   deleteDoc,
//   getDocs,
// } from

const firebaseConfig = {
  apiKey: "AIzaSyB5ZTa2CfFdZXZQmtimIzzgaOW9ac54-s0",
  authDomain: "sisgecoop-80396.firebaseapp.com",
  projectId: "sisgecoop-80396",
  storageBucket: "sisgecoop-80396.appspot.com",
  messagingSenderId: "716420769469",
  appId: "1:716420769469:web:809f6b42922dbeb0ba79d4",
  measurementId: "G-41LGMBDHH2"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
});