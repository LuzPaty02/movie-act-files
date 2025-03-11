// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9kLQzL7NSQb3qpbvu67CuPpiYlIARJWo",
    authDomain: "movie-explorer-f8199.firebaseapp.com",
    projectId: "movie-explorer-f8199",
    storageBucket: "movie-explorer-f8199.firebasestorage.app",
    messagingSenderId: "622962005079",
    appId: "1:622962005079:web:025dee7a1b8c107f017f12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();