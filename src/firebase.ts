// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyCI0zL04S4ai5IbOxuH9mChgf4TCEVdNrU",
  authDomain: "nlp-proposer.firebaseapp.com",
  projectId: "nlp-proposer",
  storageBucket: "nlp-proposer.appspot.com",
  messagingSenderId: "296838568611",
  appId: "1:296838568611:web:4715b67072b27226f17d16",
};

const app = initializeApp(config);
export const db = getFirestore(app);
