// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebaseApp from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// import { initAuth } from "./auth/initAuth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDEIdnLbXJxdqXKCF-KevhM6xOkdlcqEx8",
//   authDomain: "e-learning-76331.firebaseapp.com",
//   projectId: "e-learning-76331",
//   storageBucket: "e-learning-76331.appspot.com",
//   messagingSenderId: "495670109657",
//   appId: "1:495670109657:web:54824dc4fe1b742d5065c8",
//   measurementId: "G-BP9ZXV827V"
// };


const firebaseConfig = {
  apiKey: "AIzaSyDEIdnLbXJxdqXKCF-KevhM6xOkdlcqEx8",
  authDomain: "e-learning-76331.firebaseapp.com",
  projectId: "e-learning-76331",
  storageBucket: "e-learning-76331.appspot.com",
  messagingSenderId: "495670109657",
  appId: "1:495670109657:web:54824dc4fe1b742d5065c8",
  measurementId: "G-BP9ZXV827V"
};
// Initialize Firebase
const firebase = /* firebaseApp.apps.length */ (/* typeof window !== 'undefined' && */ !firebaseApp.apps.length)
  ? firebaseApp.initializeApp(firebaseConfig)
  : firebaseApp.app();

// initAuth();
// firebaseApp.analytics();

export default firebase;

export { firebase };
