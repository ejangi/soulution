import './App.scss';
import React, { useState, useEffect } from 'react';
import ProblemCollection from './state/problemModel';
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
    return prob;
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
          <ProblemsModal openState={modal} setOpenState={setModal} problem={problem} setProblem={setProblem} onChange={onChange} onStepChange={onStepChange} />
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
