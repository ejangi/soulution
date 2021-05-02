import db from '../firebase.config';

export default class FirestoreModel {
    store;
    
    constructor() {
        this.store = db;
    }

    get problemCollection() {
        return 'problems';
    }

    get solutionCollection() {
        return 'solutions';
    }

    get userCollection() {
        return 'users';
    }
}