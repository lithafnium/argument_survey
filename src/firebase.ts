// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyDksfKXsdc4hy4uHAdRwr62ecrB3edbZf8",
  authDomain: "argument-survey.firebaseapp.com",
  projectId: "argument-survey",
  storageBucket: "argument-survey.appspot.com",
  messagingSenderId: "804170673667",
  appId: "1:804170673667:web:4e165a991955b84c87a836",
  measurementId: "G-R1M05VNTF7",
};

const app = initializeApp(config);
export const db = getFirestore(app);
