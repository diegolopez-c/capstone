import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";
import LandingPage from "./pages/LandingPage";
import Profile from "./components/Profile";
import NewAppointmentPage from "./pages/doctor/NewAppointmentPage";
import NewMedicalReportPage from "./pages/doctor/NewMedicalReportPage";
import PatientSeach from "./pages/doctor/PatientSearch";
import NewPrescriptionPage from "./pages/doctor/NewPrescriptionPage";
import ExpirationMedicine from "./pages/pharmacist/ExpirationMedicine";
import MedicineInventory from "./pages/pharmacist/MedicineInventory";
import PrescriptionHistory from "./pages/pharmacist/PrescriptionHistory";
import Appointments from "./pages/doctor/Appointments";
import DispatchPrescriptionPage from "./pages/pharmacist/DispatchPrescriptionPage";
import PatientNewAppointmentPage from "./pages/patient/PatientNewAppointmentPage";
import PatientAppointmentsPage from "./pages/patient/PatientAppointmentsPage";
import PatientHistoryPage from "./pages/patient/PatientHistoryPage";
import PatientPrescriptionsPage from "./pages/patient/PatientPrescriptionsPage";
import RoleRedirect from "./pages/RoleRedirect";
import CreatingUserPage from "./pages/CreatingUserPage";
import NotificationTester from "./pages/NotificationTester";

function App() {
  return (
    <Routes>
      {/* Overall Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/user-creation" element={<CreatingUserPage />} />
      <Route path="/redirect" element={<RoleRedirect />} />
      <Route path="/profile" element={<Profile />} />

      {/* Doctor Routes */}
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor-appointments" element={<Appointments />} />
      <Route path="/new-appointment" element={<NewAppointmentPage />} />
      <Route path="/new-medical-report" element={<NewMedicalReportPage />} />
      <Route path="/new-prescription" element={<NewPrescriptionPage />} />
      <Route path="/patient-search" element={<PatientSeach />} />

      {/* Patient Routes */}
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route
        path="/patient-new-appointment"
        element={<PatientNewAppointmentPage />}
      />
      <Route
        path="/patient-appointments"
        element={<PatientAppointmentsPage />}
      />
      <Route path="/patient-history" element={<PatientHistoryPage />} />
      <Route
        path="/patient-prescriptions"
        element={<PatientPrescriptionsPage />}
      />

      {/* Pharmacist Routes */}
      <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />
      <Route
        path="/dispatch-prescription"
        element={<DispatchPrescriptionPage />}
      />
      <Route path="/expiration-medicine" element={<ExpirationMedicine />} />
      <Route path="/medicine-inventory" element={<MedicineInventory />} />
      <Route path="/prescription-history" element={<PrescriptionHistory />} />

      {/**Notification Routes */}
      <Route path="/notifications" element={<NotificationTester />} />
    </Routes>
  );
}

export default App;
