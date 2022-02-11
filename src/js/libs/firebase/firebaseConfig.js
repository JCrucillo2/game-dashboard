// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDc2i6G1uT-9GaRcnWJ-8NOOKFS_tTkhFM",
    authDomain: "game-seller-3fb37.firebaseapp.com",
    databaseURL: "https://game-seller-3fb37-default-rtdb.firebaseio.com",
    projectId: "game-seller-3fb37",
    storageBucket: "game-seller-3fb37.appspot.com",
    messagingSenderId: "712281536681",
    appId: "1:712281536681:web:34ab02e237361eef9c11b8",
    measurementId: "G-NL2FZWXLC5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

export { db, storage };
