import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { useState } from 'react';

import Home from './pages/Home';
import Patient from './pages/Patient';
import Login from './pages/Login';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="patient/:patientId" element={<Patient />} />
      </Routes>
    </Router>
  )
}

export default App
