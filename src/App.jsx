import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { ThemeProvider } from './utils/ThemeProvider';

import Home from './pages/Home';
import PatientList from './pages/PatientList';
import Patient from './pages/Patient';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact/>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<PrivateRoutes/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="patient/:patientId" element={<Patient />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
