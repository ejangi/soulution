import React, { useState, useEffect } from "react";
import ProblemCollection from "./state/problemModel";
import ProblemsList from "./components/problemsList";
import ProblemsModal from "./components/problemsModal";
import ErrorModal from "./components/errorModal";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import "./App.scss";
import LogoInversed from "./Logo-Inversed.svg";

function App() {
  const [modal, setModal] = useState(0);
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState(ProblemCollection.blankProblem());
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [uid, setUid] = useState(null);
  const [error, setError] = useState(null);

  const [authReady, setAuthReady] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => onAuthStateChanged(auth, (user) => {
    setIsSignedIn(!!user);
    setUid(user ? user.uid : null);
    setAuthReady(true);
    if (!user) setProblems([]);
  }), []);

  const signIn = async () => {
    setAuthError(null);
    setSigningIn(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        setAuthError("Could not sign in with Google. Please try again.");
        console.error(error);
      }
    } finally {
      setSigningIn(false);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      error.description = "During sign out.";
      setError(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (uid) {
        try {
          const data = await ProblemCollection.getAllProblems(uid);
          await setProblems((prev) => data);
        } catch (error) {
          error.description = "During getAllProblems(uid) at uid change.";
          setError(error);
          console.error(error);
        }
      }
    })();
  }, [uid]);

  const getProblem = (id) => {
    let filtered = problems.filter((p) => p.id === id);
    let prob = filtered && filtered.length > 0 ? filtered[0] : null;
    setProblem((oldProblem) => {
      if (prob.Solution) {
        setModal(6);
      } else if (prob.Plan && prob.Plan.length > 0) {
        setModal(5);
      } else if (prob.Solutions && prob.Solutions.length > 0) {
        setModal(4);
      } else if (prob.Title) {
        setModal(2);
      } else {
        setModal(1);
      }

      return prob;
    });

    return prob;
  };

  const deleteProblem = async (id) => {
    if (!id) return;
    ProblemCollection.deleteCurrentProblem(id)
      .then(() => {
        setModal(0);
        try {
          ProblemCollection.getAllProblems(uid).then((data) => {
            setProblems((prev) => data);
          });
        } catch (error) {
          error.description = "At getAllProblems(uid) during deleteProblem().";
          setError(error);
          console.error(error);
        }
      })
      .catch((err) => {
        err.description = "At deleteCurrentProblem(id) during deleteProblem()";
        setError(err);
        console.error(err);
      });
  };

  const onChange = (key, value) => {
    if (key === "Solutions") {
      setProblem((problem) => {
        for (let i = 0; i < problem[key].length; i++) {
          if (problem[key][i] && !value.includes(problem[key][i].Title)) {
            delete problem[key][i];
          }
        }
        let currentSolutions = problem[key].map((solution) => solution.Title);
        value.forEach((solution) => {
          if (!currentSolutions.includes(solution)) {
            let newSolution = ProblemCollection.blankSolution();
            newSolution.Title = solution;
            problem[key].push(newSolution);
          }
        });
        return problem;
      });
    } else if (key.includes("[") && key.includes(".")) {
      let parts = key.split(/\.|\[/).map((part) => part.replace(/]$/, ""));
      if (parts.length === 3) {
        let key1 = parts[0],
          key2 = parts[1],
          key3 = parts[2];
        setProblem((problem) => {
          problem[key1][key2][key3] = value;
          return problem;
        });
      }
    } else {
      setProblem((problem) => {
        problem[key] = value;
        return problem;
      });
    }
  };

  const onStepChange = async (step) => {
    try {
      if (!problem.uid && uid) {
        problem.uid = uid;
      }

      let savedProblem = await ProblemCollection.saveCurrentProblem(problem);
      setProblem((problem) => savedProblem);
      ProblemCollection.getAllProblems(uid).then((data) => {
        setProblems((prev) => data);
      });
    } catch (err) {
      err.description =
        "Catch at saveCurrentProblem(problem) during onStepChange().";
      err.stack = JSON.stringify(problem);
      setError(err);
      console.error(err);
    }
  };

  const handleModalButton = (e) => {
    setProblem((problem) => ProblemCollection.blankProblem());
    setModal(1);
  };

  return (
    <>
      {!authReady ? null : !isSignedIn ? (
        <div className="App loggedout">
          <header className="header">
            <div className="container">
              <img src={LogoInversed} alt="Soulution" className="logo" />
              <button type="button" className="btn" onClick={signIn} disabled={signingIn}>
                {signingIn ? "Signing in…" : "Sign in with Google"}
              </button>
              {authError && <p role="alert">{authError}</p>}
            </div>
          </header>
        </div>
      ) : (
        <>
          {problems.length > 0 ? (
            <div className="App">
              <header className="header">
                <div className="container">
                  <div className="flex">
                    <img
                      src={LogoInversed}
                      alt="Soulution"
                      className="logo"
                      width="80"
                    />
                    <a
                      href="#logout"
                      className="logout"
                      onClick={(e) => {
                        e.preventDefault();
                        logOut();
                      }}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </header>

              <main>
                <div className="container">
                  <ProblemsList problems={problems} getProblem={getProblem} />
                </div>
              </main>
              <footer className="footer">
                <div className="container">
                  <button
                    type="button"
                    className="btn btn-pimary"
                    onClick={handleModalButton}
                  >
                    Solve a new problem
                  </button>
                </div>
              </footer>
              <ProblemsModal
                openState={modal}
                setOpenState={setModal}
                problem={problem}
                setProblem={setProblem}
                handleDelete={deleteProblem}
                onChange={onChange}
                onStepChange={onStepChange}
              />
              <ErrorModal error={error} />
            </div>
          ) : (
            <div className="App empty">
              <main>
                <div className="container">
                  <div className="flex-stack">
                    <div className="flex">
                      <img
                        src={LogoInversed}
                        alt="Soulution"
                        className="logo"
                        width="90"
                      />
                      <a
                        href="#logout"
                        className="logout"
                        onClick={(e) => {
                          e.preventDefault();
                          logOut();
                        }}
                      >
                        Logout
                      </a>
                    </div>
                    <div className="row">&nbsp;</div>
                    <div className="row">
                      <h1>Welcome!</h1>
                      <p>
                        Structured problem solving a great technique to help you
                        step back from a problem and help your mind work towards
                        a solution.
                      </p>
                    </div>
                    <div className="row arrow">
                      <div className="arrow">&nbsp;</div>
                    </div>
                    <div className="row action">
                      <button onClick={handleModalButton}>
                        Solve your first problem
                      </button>
                    </div>
                  </div>
                </div>
              </main>
              <ProblemsModal
                openState={modal}
                setOpenState={setModal}
                problem={problem}
                setProblem={setProblem}
                handleDelete={deleteProblem}
                onChange={onChange}
                onStepChange={onStepChange}
              />
              <ErrorModal error={error} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
