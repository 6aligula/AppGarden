import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/Style.css';
import Home from './screens/Home';
import HumedadTierra from './components/HumedadTierraChart'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/humedadtierra" element={<HumedadTierra />} />
      </Routes>
    </Router>
  );
}

export default App;
