import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB9L6tp-gIOYM-10MqrznGi-284XPR3Oxk",
  authDomain: "slack-clone-a196c.firebaseapp.com",
  projectId: "slack-clone-a196c",
  storageBucket: "slack-clone-a196c.appspot.com",
  messagingSenderId: "49272758062",
  appId: "1:49272758062:web:a612b5ab474b7b9a6924bf",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
