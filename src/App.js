import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/Style.css';
import Home from './screens/Home';
import HumedadTierra from './components/HumedadTierraChart'; 
import DataView from './components/TableDataView'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/humedadtierra" element={<HumedadTierra />} />
        <Route path="/DataView" element={<DataView />} />
      </Routes>
    </Router>
  );
}

export default App;
