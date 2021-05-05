import FirestoreModel from './firestoreModel.js';

describe('testDateToTimestamp', () => {
    it('returns current timestamp', () => {
        const fbm = new FirestoreModel();
        expect(fbm.dateToTimestamp(new Date('2021-05-04 20:54:00'))).toEqual({"nanoseconds": 0, "seconds": 1620161640});
    });
});