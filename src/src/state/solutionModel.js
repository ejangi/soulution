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

    syncSolutionsPossibilities(problem) {
        let solutionArray = problem.solutions.map(solution => solution.Title);
        problem.solutions = problem.Possibilities.map(possibility => {
            if (!solutionArray.includes(possibility)) {
                let solution = this.blankSolution();
                solution.Title = possibility;
                return solution;
            } else {
                return problem.solutions.filter(solution => solution.Title === possibility)[0];
            }
        });
        return problem;
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

    async saveCurrentSolution(solution) {
        let currentSolutionDocument;

        if (solution.id) {
            let s = solution;
            delete s.id;

            currentSolutionDocument = await this.store
                .collection(this.solutionCollection)
                .doc(solution.id)
                .update(s);
        } else {
            currentSolutionDocument = await this.store
                .collection(this.solutionCollection)
                .add(solution);
        }

        return { ...currentSolutionDocument.data(), id: currentSolutionDocument.id };
    }
}

export default new SolutionModel();