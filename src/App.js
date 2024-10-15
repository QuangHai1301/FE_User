import React from "react";


import "./index.css";
import Detail_Product from "./components/Detail_Product";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataFromSQL from "./db/DataFromSQL";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail" element={<Detail_Product/>} />
      <Route path="/data" element={<DataFromSQL/>} />
    </Routes>
  </Router>
  );
}

export default App;