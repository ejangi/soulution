import FirestoreModel from './firestoreModel';

class UserModel extends FirestoreModel {
    get collection() {
        return 'users';
    }

    public async getCurrentUser(userId) {
        const currentUserDocument = await this.store
            .collection(this.collection)
            .doc(userId)
            .get();
        return { ...currentUserDocument.data(), id: currentUserDocument.id };
    }

    public async getAllUsers() {
      const userCollection = await this.store.collection(this.collection).get();
      return userCollection.docs.map(user => ({ ...user.data(), id: user.id }));
    }
}

export default new UserModel();