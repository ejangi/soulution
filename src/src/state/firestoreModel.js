import { Timestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

export default class FirestoreModel {
    store;
    
    constructor() {
        this.store = db;
    }

    dateToTimestamp(d) {
        return Timestamp.fromDate(d);
    }

    get problemCollection() {
        return 'problems';
    }
}