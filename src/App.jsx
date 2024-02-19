import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Patient from './pages/Patient';


function App() {

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
