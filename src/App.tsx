import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route
          path="/second"
          element={localStorage.getItem('user') ? <SecondPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
 