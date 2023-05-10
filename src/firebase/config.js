// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDPlVO8gaHRfMvXJQvsAPWMv59QkR7tp7I",
  authDomain: "eshop-bbe9d.firebaseapp.com",
  projectId: "eshop-bbe9d",
  storageBucket: "eshop-bbe9d.appspot.com",
  messagingSenderId: "736297620971",
  appId: "1:736297620971:web:d5465d57be787ca25bf5ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
