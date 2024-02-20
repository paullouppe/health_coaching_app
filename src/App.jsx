import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Patient from './pages/Patient';
import Profil from './pages/Profil';
import Setting from './pages/Setting';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="patient/:patientId" element={<Patient />} />
        <Route path="profile/" element={<Profil />} />
        <Route path="settings/" element={<Setting />} />
      </Routes>
    </Router>
  )
}

export default App
