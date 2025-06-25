import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";
import LandingPage from "./pages/LandingPage";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="patient-dashboard" element={<PatientDashboard />} />
        <Route path="pharmacist-dashboard" element={<PharmacistDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
