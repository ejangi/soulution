import './App.scss';
import React from 'react';
import ProblemsList from './components/problemsList';

function App() {
  return (
      <div className="App">
        <header className="header">
          <div className="container">
            ...
          </div>
        </header>
        <main>
          <div className="container">
            <ProblemsList />
          </div>
        </main>
      </div>
  );
}

export default App;
