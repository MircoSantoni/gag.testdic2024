import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Layout><Home/></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
