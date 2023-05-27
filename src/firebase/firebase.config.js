// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1bQtEthqGvKByixm5e3IRR8Wdnv1HIV8",
  authDomain: "stockprice-de958.firebaseapp.com",
  projectId: "stockprice-de958",
  storageBucket: "stockprice-de958.appspot.com",
  messagingSenderId: "854365636759",
  appId: "1:854365636759:web:1e8a6611dca2ee47d5c1d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app