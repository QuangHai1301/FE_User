import React from "react";

import SignUp from "./components/signup";
import Login from "./components/signin";
import "./index.css";
import Detail_Product from "./components/Detail_Product";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataFromSQL from "./db/DataFromSQL";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/product/:id" element={<Detail_Product/>} />
      <Route path="/data" element={<DataFromSQL/>} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<Login />} />
    </Routes>
  </Router>
  );
}

export default App;