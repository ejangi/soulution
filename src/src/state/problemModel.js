import FirestoreModel from "./firestoreModel";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";

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
    const currentProblemDocument = await getDoc(doc(this.store, this.problemCollection, problemId));
    return { ...currentProblemDocument.data(), id: currentProblemDocument.id };
  }

  async getAllProblems(uid) {
    const problemCollection = await getDocs(query(
      collection(this.store, this.problemCollection),
      where("uid", "==", uid),
      orderBy("LastUpdatedDate", "desc")
    ));
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
      // Keep Firestore Timestamp values intact when copying the document.
      const { id, ...p } = problem;
      p.LastUpdatedDate = this.dateToTimestamp(new Date());

      await updateDoc(doc(this.store, this.problemCollection, id), p);
      return problem;
    } else {
      problem.CreatedDate = this.dateToTimestamp(new Date());
      problem.LastUpdatedDate = this.dateToTimestamp(new Date());

      let docRef = await addDoc(collection(this.store, this.problemCollection), problem);

      return { ...problem, id: docRef.id };
    }
  }

  async deleteCurrentProblem(problemId) {
    const result = await deleteDoc(doc(this.store, this.problemCollection, problemId));
    return result;
  }
}

// eslint-disable-next-line
export default new ProblemModel();
