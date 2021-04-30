import './App.scss';
import React from 'react';
import useProblems from './models/useProblems';
import ProblemsList from './components/problemsList';
import ProblemsModal from './components/problemsModal';

function App() {
  const [problems] = useProblems();

  return (
    <>
    { problems.length > 0 ?
      <div className="App">
          <header className="header">
            <div className="container">
              ...
            </div>
          </header>  
          <main>
            <div className="container">
              <ProblemsList problems={problems} />
            </div>
          </main>
          <ProblemsModal />
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
                <div className="row arrow"><div class="arrow">&nbsp;</div></div>
                <div className="row action">
                  <button>Solve your first problem</button>
                </div>
              </div>              
            </div>
          </main>
      </div>
    }
    </>
  );
}

export default App;
