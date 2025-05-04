// Configura tu Firebase aquí
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOHF72nTWlHqbPbU66mXVn2Osu5-U2-to",
  authDomain: "worldcat-94dac.firebaseapp.com",
  projectId: "worldcat-94dac",
  storageBucket: "worldcat-94dac.firebasestorage.app",
  messagingSenderId: "535756540777",
  appId: "1:535756540777:web:3d591791a6b395e6ee0bf8",
  measurementId: "G-YZM0DM4M1E"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);