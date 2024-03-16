// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnFA-HSIiRf80DlGnqvWRmxMT-p-wWxMA",
  authDomain: "moksh-app-bd73b.firebaseapp.com",
  projectId: "moksh-app-bd73b",
  storageBucket: "moksh-app-bd73b.appspot.com",
  messagingSenderId: "371575297728",
  appId: "1:371575297728:web:15d0948ed79f1c098bff25",
  measurementId: "G-EPCCJ3NFG3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// const analytics = getAnalytics(app);