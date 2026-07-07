import React from 'react';
import './App.css';
import Wallet from './components/Wallet';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Selenium & Electrum Wallet</h1>
      </header>
      <main>
        <Wallet />
      </main>
    </div>
  );
}

export default App;
