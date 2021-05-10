import firebase from 'firebase/app';
import 'firebase/firestore';

let config = {
    apiKey: process.env._API_KEY,
    authDomain: process.env._AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env._STORAGE_BUCKET,
    messagingSenderId: process.env._MESSAGE_SENDER_ID,
    appId: process.env._APP_ID
};

firebase.initializeApp(config);

export default firebase;