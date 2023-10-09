// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "truecrime-6f10f.firebaseapp.com",
  databaseURL:
    "https://truecrime-6f10f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "truecrime-6f10f",
  storageBucket: "truecrime-6f10f.appspot.com",
  messagingSenderId: "597261748863",
  appId: "1:597261748863:web:fd6b774208c75be6224d4a",
  measurementId: "G-F2TE95EBVY",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
