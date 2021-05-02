import FirestoreModel from './firestoreModel';

class ProblemModel extends FirestoreModel {
    blankProblem() {
        return {
            "Plan": [],
            "Possibilities": [],
            "Solution": null,
            "solutions": [],
            "LastUpdatedDate": null,
            "Title": "",
            "SolvedDate": null,
            "CreatedDate": null,
            "id": null
        };
    }

    async getCurrentProblem(problemId) {
        const currentProblemDocument = await this.store
            .collection(this.problemCollection)
            .doc(problemId)
            .get();
        return { ...currentProblemDocument.data(), id: currentProblemDocument.id };
    }

    async getAllProblems() {
      const problemCollection = await this.store
            .collection(this.problemCollection)
            .get();
      return problemCollection.docs.map(problem => ({ ...problem.data(), id: problem.id }));
    }
}

export default new ProblemModel();