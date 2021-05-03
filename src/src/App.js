import './App.scss';
import React, { useState, useEffect } from 'react';
import ProblemCollection from './state/problemModel';
import SolutionCollection from './state/solutionModel';
import ProblemsList from './components/problemsList';
import ProblemsModal from './components/problemsModal';

function App() {
  const [modal, setModal] = useState(false);
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState(ProblemCollection.blankProblem());

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
    setModal(true);
    SolutionCollection.getAllSolutions(id)
      .then(solutions => {
        console.log(solutions);
        setProblem(problem => {
          problem.solutions = solutions;
          return problem;
        })
      });
    return prob;
  }

  const handleModalButton = (e) => {
    setProblem(problem => ProblemCollection.blankProblem());
    setModal(true);
  };

  let incompleteProblems = [];
  let completeProblems = [];

  if (problems.length > 0) {
    incompleteProblems = problems.filter(prob => prob.SolvedDate === null );
    completeProblems = problems.filter(prob => prob.SolvedDate !== null );
  }

  return (
    <>
    { problems.length > 0 ?
      <div className="App">
          { incompleteProblems.length > 0 &&
          <header className="header">
            <div className="container">
              <ProblemsList problems={incompleteProblems} getProblem={getProblem} />
            </div>
          </header>
          }  
          <main>
            <div className="container">
              <ProblemsList problems={completeProblems} getProblem={getProblem} />
            </div>
          </main>
          <footer className="footer">
            <div className="container">
              <button type="button" className="btn btn-pimary" onClick={handleModalButton}>Solve a new problem</button>
            </div>
          </footer>
          <ProblemsModal openState={modal} setOpenState={setModal} problem={problem} setProblem={setProblem} />
      </div>
          :
      <div className="App empty">
          <main>
            <div className="container">
              <div className="flex-stack">
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
          <ProblemsModal openState={modal} setOpenState={setModal} problem={problem} setProblem={setProblem} />
      </div>
    }
    </>
  );
}

export default App;
