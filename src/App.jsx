import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { useState } from 'react';

import Home from './pages/Home';
import PatientList from './pages/PatientList';
import Patient from './pages/Patient';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import PrivateRoutes from './utils/PrivateRoutes';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<PrivateRoutes/>}>
          <Route path="/patients" element={<PatientList />} />
          <Route path="patient/:patientId" element={<Patient />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
