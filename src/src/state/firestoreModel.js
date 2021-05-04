import firebase from '../firebase.config';

export default class FirestoreModel {
    store;
    
    constructor() {
        this.store = firebase.firestore();
    }

    dateToTimestamp(d) {
        firebase.firestore.Timestamp.fromDate(d);
    }

    get problemCollection() {
        return 'problems';
    }

    get userCollection() {
        return 'users';
    }
}