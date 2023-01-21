// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCduVWltQVGgrSFO1BcG4jxyfWhASizE2Y",
  authDomain: "whatsapp-web-clone-ab4b6.firebaseapp.com",
  projectId: "whatsapp-web-clone-ab4b6",
  storageBucket: "whatsapp-web-clone-ab4b6.appspot.com",
  messagingSenderId: "53946316266",
  appId: "1:53946316266:web:566c7819cd2a966ad46e93",
  measurementId: "G-57ELKFGWCQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
