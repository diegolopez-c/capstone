import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="patient-dashboard" element={<PatientDashboard />} />
        <Route path="pharmacist-dashboard" element={<PharmacistDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
