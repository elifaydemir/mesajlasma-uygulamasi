import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCx9aICkkXRQSpZaAtMVJf4rO3M9sUjulE",
    authDomain: "chating-dev-7ebb0.firebaseapp.com",
    projectId: "chating-dev-7ebb0",
    storageBucket: "chating-dev-7ebb0.appspot.com",
    messagingSenderId: "116747860391",
    appId: "1:116747860391:web:c8ff7d70669c847f4f9e82",
    measurementId: "G-419YP9JMR9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;