import React from 'react';
import './App.css';

import Calculator from './components/Calculator';
import Chart from './components/Chart';

function App() {
  return (
    <div className="App">
      <h1>Resistor Color Code Calculator</h1>
      <div className="container">
        <Calculator />
        <Chart />
      </div>
    </div>
  );
}

export default App;
