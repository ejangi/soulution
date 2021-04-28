import firebase from 'firebase/app';
import 'firebase/firestore';

let config = {
    apiKey: "apiKey",
    authDomain: "autDomain",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "senderId",
    appId: "appId"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default db;