import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EthereumProvider from './EthereumProvider'

const App = () => {
  return (
    <EthereumProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </EthereumProvider>
  );
}

export default App;
