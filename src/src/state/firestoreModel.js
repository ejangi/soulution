import db from '../firebase.config';

export default class FirestoreModel {
    store;
    
    constructor() {
        this.store = db;
    }
}