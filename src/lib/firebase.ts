// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAACyoC-Q0lCuRJGTLFnXCUkiInOreD8Bw",
    authDomain: "url-crawler-agent.firebaseapp.com",
    projectId: "url-crawler-agent",
    storageBucket: "url-crawler-agent.firebasestorage.app",
    messagingSenderId: "634772447044",
    appId: "1:634772447044:web:57611708a4423620264111",
    measurementId: "G-4CP5ZSX03B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Enable persistence
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });

export { db, auth };