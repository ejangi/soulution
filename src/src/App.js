import './App.scss';
import React, { useState, useEffect } from 'react';
import ProblemCollection from './state/problemModel';
import ProblemsList from './components/problemsList';
import ProblemsModal from './components/problemsModal';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LogoInversed from './Logo-Inversed.svg';

function App() {
  const [modal, setModal] = useState(0);
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState(ProblemCollection.blankProblem());
  const [isSignedIn, setIsSignedIn] = useState(false);

  const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // We will display Google auth provider.
      signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
      },
  };

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  useEffect(() => {
    (async () => {
       try {
         const data = await ProblemCollection.getAllProblems();
         await setProblems(prev => (data));
       } catch (error) {
          console.error(error);
       }
    })();
  }, []);

  const getProblem = (id) => {
    let filtered = problems.filter(p => p.id === id);
    let prob = filtered && filtered.length > 0 ? filtered[0] : null;
    setProblem(prob);

    if (prob.Solution) {
      setModal(6);
    }
    else {
      setModal(1);
    }

    return prob;
  }

  const deleteProblem = async (id) => {
    ProblemCollection.deleteCurrentProblem(problem.id)
    .then(() => {
      setModal(0);
      try {
        ProblemCollection.getAllProblems()
        .then((data) => {
          setProblems(prev => (data))
        });
      } catch (error) {
         console.error(error);
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  const onChange = (key, value) => {
    if (key === 'Solutions') {
        setProblem(problem => {
            for(let i = 0; i < problem[key].length; i++) {
              if (problem[key][i] && !value.includes(problem[key][i].Title)) {
                delete problem[key][i];
              }
            }
            let currentSolutions = problem[key].map(solution => solution.Title);
            value.forEach(solution => {
              if (!currentSolutions.includes(solution)) {
                let newSolution = ProblemCollection.blankSolution();
                newSolution.Title = solution;
                newSolution.CreatedDate = ProblemCollection.dateToTimestamp(new Date());
                problem[key].push(newSolution);
              }
            });
            return problem;
        });
    } else if(key.includes('[') && key.includes('.')) {
      let parts = key.split(/\.|\[/).map(part => part.replace(/]$/, ''));
      if (parts.length === 3) {
        let key1 = parts[0],
            key2 = parts[1],
            key3 = parts[2];
        setProblem(problem => {
            problem[key1][key2][key3] = value;
            return problem;
        });
      }
    } else {
        setProblem(problem => {
            problem[key] = value;
            return problem;
        });
    }
  };

  const onStepChange = async (step) => {
    try {
      let savedProblem = await ProblemCollection.saveCurrentProblem(problem);
      setProblem(problem => savedProblem);
    } catch(err) {
      console.error(err);
    }
  };

  const handleModalButton = (e) => {
    setProblem(problem => ProblemCollection.blankProblem());
    setModal(1);
  };

  return (
    <>
    { !isSignedIn ?
      <div className="App loggedout">
        <header className="header">
          <div className="container">
            <img src={LogoInversed} alt="Soulution" className="logo" />
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        </header>
      </div>
      :
      <>
      { problems.length > 0 ?
        <div className="App">
            <header className="header">
              <div className="container">
                <div className="flex">
                  <img src={LogoInversed} alt="Soulution" className="logo" width="80" />
                  <a href="#logout" className="logout" onClick={() => firebase.auth().signOut()}>Logout</a>
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
                <button type="button" className="btn btn-pimary" onClick={handleModalButton}>Solve a new problem</button>
              </div>
            </footer>
            <ProblemsModal openState={modal} setOpenState={setModal} problem={problem} setProblem={setProblem} handleDelete={deleteProblem} onChange={onChange} onStepChange={onStepChange} />
        </div>
            :
        <div className="App empty">
            <main>
              <div className="container">
                <div className="flex-stack">
                  <div className="flex">
                    <img src={LogoInversed} alt="Soulution" className="logo" width="90" />
                    <a href="#logout" className="logout" onClick={() => firebase.auth().signOut()}>Logout</a>
                  </div>
                  <div className="row">&nbsp;</div>
                  <div className="row">
                    <h1>Welcome!</h1>
                    <p>Structured problem solving a great technique to help you step back from a problem and help your mind work towards a solution.</p>
                  </div>
                  <div className="row arrow"><div className="arrow">&nbsp;</div></div>
                  <div className="row action">
                    <button onClick={handleModalButton}>Solve your first problem</button>
                  </div>
                </div>              
              </div>
            </main>
            <ProblemsModal openState={modal} setOpenState={setModal} problem={problem} setProblem={setProblem} handleDelete={deleteProblem} />
        </div>
      }
      </>
    }
    </>
  );
}

export default App;
