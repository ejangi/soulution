import FirestoreModel from "./firestoreModel";

class ProblemModel extends FirestoreModel {
  blankProblem() {
    return {
      id: null,
      uid: null,
      Plan: [],
      Solution: null,
      Solutions: [],
      LastUpdatedDate: null,
      Title: "",
      SolvedDate: null,
      CreatedDate: null,
    };
  }

  blankSolution() {
    return {
      Title: null,
      Cons: [],
      Pros: [],
    };
  }

  normaliseProblem(problem) {
    if (problem.Solution && !problem.SolvedDate) {
      problem.SolvedDate = this.dateToTimestamp(new Date());
    }

    if (problem.Solutions && problem.Solutions.length > 0) {
      for (let i = 0; i < problem.Solutions.length; i++) {
        if (
          !problem.Solutions[i] ||
          problem.Solutions[i]?.Title?.trim() === ""
        ) {
          delete problem.Solutions[i];
        }
      }
    }

    return problem;
  }

  async getCurrentProblem(problemId) {
    const currentProblemDocument = await this.store
      .collection(this.problemCollection)
      .doc(problemId)
      .get();
    return { ...currentProblemDocument.data(), id: currentProblemDocument.id };
  }

  async getAllProblems(uid) {
    const problemCollection = await this.store
      .collection(this.problemCollection)
      .where("uid", "==", uid)
      .orderBy("LastUpdatedDate", "desc")
      .get();
    return problemCollection.docs.map((problem) => ({
      ...problem.data(),
      id: problem.id,
    }));
  }

  async saveCurrentProblem(problem) {
    if (!problem) {
      throw new Error("Trying to save an undefined problem");
    }

    problem = this.normaliseProblem(problem);

    if (problem.id) {
      // Make sure we got a copy and not a reference of the original
      let p = JSON.parse(JSON.stringify(problem));
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

      let docRef = await this.store
        .collection(this.problemCollection)
        .add(problem);

      return { ...problem, id: docRef.id };
    }
  }

  async deleteCurrentProblem(problemId) {
    const result = await this.store
      .collection(this.problemCollection)
      .doc(problemId)
      .delete();
    return result;
  }
}

// eslint-disable-next-line
export default new ProblemModel();
