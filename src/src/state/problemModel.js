import FirestoreModel from './firestoreModel';

class ProblemModel extends FirestoreModel {
    blankProblem() {
        return {
            "id": null,
            "Plan": [],
            "Solution": null,
            "solutions": [],
            "LastUpdatedDate": null,
            "Title": "",
            "SolvedDate": null,
            "CreatedDate": null
        };
    }

    blankSolution() {
        return {
            "Title": null,
            "Cons": [],
            "Pros": []
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

    async saveCurrentProblem(problem) {
        if (!problem) {
            throw new Error('Trying to save an undefined problem');
        }

        if (problem.id) {
            // Make sure we got a copy and not a reference of the original
            let p = JSON.parse( JSON.stringify(problem) );
            delete p.id;
            p.LastUpdatedDate = this.dateToTimestamp(new Date());

            await this.store
                .collection(this.problemCollection)
                .doc(problem.id)
                .update(p);
            return problem;
        } else {
            problem.CreatedDate = this.dateToTimestamp(new Date());
            problem.LastUpdatedDate = this.dateToTimestamp(new Date());

            let newId = await this.store
                .collection(this.problemCollection)
                .add(problem);
            return { ...problem, id: newId };
        }
    }
}

export default new ProblemModel();