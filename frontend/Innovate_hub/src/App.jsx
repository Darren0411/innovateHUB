import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Navbar from './Components/Navbar';
import Landing from './Components/Landing';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* You can add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;