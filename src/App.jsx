import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { useState } from 'react';

import Home from './pages/Home';
import Patient from './pages/Patient';
import Signin from './pages/Signin';
import Signup from './pages/Signup';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="patient/:patientId" element={<Patient />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
