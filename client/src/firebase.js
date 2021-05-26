import firebase from 'firebase/app';
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBCwjmbBXfs5uKbQB_xIqEUHG3LvxS2BFE",
  authDomain: "ya-bento.firebaseapp.com",
  projectId: "ya-bento",
  storageBucket: "ya-bento.appspot.com",
  messagingSenderId: "381491337927",
  appId: "1:381491337927:web:223fbcf5198e9272133ce2",
  measurementId: "G-P2K89XS53J"
})

export default firebaseApp;