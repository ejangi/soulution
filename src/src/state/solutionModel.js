import FirestoreModel from './firestoreModel';

class SolutionModel extends FirestoreModel {
    blankSolution() {
        return {
            "Title": null,
            "Cons": [],
            "Pros": [],
            "LastUpdatedDate": null,
            "CreatedDate": null,
            "id": null
          };
    }

    async getCurrentSolution(problemId, solutionId) {
        const currentSolutionDocument = await this.store
            .collection(this.problemCollection)
            .doc(problemId)
            .collection(this.solutionCollection)
            .doc(solutionId)
            .get();
        return { ...currentSolutionDocument.data(), id: currentSolutionDocument.id };
    }

    async getAllSolutions(problemId) {
        const solutionCollection = await this.store
            .collection(this.problemCollection)
            .doc(problemId)
            .collection(this.solutionCollection)
            .get();
        return solutionCollection.docs.map(solution => ({ ...solution.data(), id: solution.id }));
      }
}

export default new SolutionModel();