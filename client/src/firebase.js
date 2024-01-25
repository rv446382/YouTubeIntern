
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBitcw10IXfsgBMkj-l63TVDz1ZAnUeAqE",
    authDomain: "nullclass-2b9ff.firebaseapp.com",
    projectId: "nullclass-2b9ff",
    storageBucket: "nullclass-2b9ff.appspot.com",
    messagingSenderId: "307721710203",
    appId: "1:307721710203:web:4f2cfe35976f6037eb90de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;