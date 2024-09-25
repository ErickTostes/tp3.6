import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<Home setIsAuthenticated={setIsAuthenticated} />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
