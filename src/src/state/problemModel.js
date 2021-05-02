import FirestoreModel from './firestoreModel';

class ProblemModel extends FirestoreModel {
    get collection() {
        return 'problems';
    }

    get nestedCollection() {
        return 'solutions';
    }

    blankProblem() {
        return {
            "Plan": [],
            "Possibilities": [],
            "Solution": null,
            "LastUpdatedDate": null,
            "Title": "",
            "SolvedDate": null,
            "CreatedDate": null,
            "id": null
        };
    }

    async getCurrentProblem(problemId) {
        const currentProblemDocument = await this.store
            .collection(this.collection)
            .doc(problemId)
            .get();
        return { ...currentProblemDocument.data(), id: currentProblemDocument.id };
    }

    async getAllProblems() {
      const problemCollection = await this.store.collection(this.collection).get();
      return problemCollection.docs.map(problem => ({ ...problem.data(), id: problem.id }));
    }

    async getCurrentSolutions(problemId) {
        const solutionCollection = await this.store
            .collection(this.collection)
            .doc(problemId)
            .collection(this.nestedCollection)
            .get();
        return solutionCollection.docs.map(solution => ({ ...solution.data(), id: solution.id }));
      }
}

export default new ProblemModel();