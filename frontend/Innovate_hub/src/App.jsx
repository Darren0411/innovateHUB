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
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<SignUp />} />
          {/* <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
          </Routes>
      </div>
    </Router>
  );
}

export default App;