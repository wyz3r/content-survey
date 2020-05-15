import firebase from 'firebase/app';
import {firestore} from 'firebase'

const settings = {timestampsInSnapshots: true}

const config = {
  apiKey: "AIzaSyA3vb5TOO912GmDzpd0EAkuHQkXkOwswds",
    authDomain: "content-surveydemo.firebaseapp.com",
    databaseURL: "https://content-surveydemo.firebaseio.com",
    projectId: "content-surveydemo",
    storageBucket: "",
    messagingSenderId: "188638993620",
    appId: "1:188638993620:web:170a586666915961"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
firestore().settings({})

export default firebase