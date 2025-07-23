import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";
import LandingPage from "./pages/LandingPage";
import Profile from "./components/Profile";
import NewAppointmentPage from "./pages/doctor/NewAppointmentPage";
import NewMedicalReportPage from "./pages/doctor/NewMedicalReportPage";
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
import { addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { fetchUserId } from "./api/userFunctions";
import { useAuth0 } from "@auth0/auth0-react";
import NewSymptomPage from "./pages/doctor/NewSymptomPage";
import NewInteractionPage from "./pages/doctor/NewInteractionPage";

const socket = io("http://localhost:8080", { withCredentials: true });

function App() {
  const { user, isLoading } = useAuth0();
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!isLoading && user) {
      const getUserId = async () => {
        const id = await fetchUserId(user.email);
        setUserId(id);
      };
      getUserId();
    }
  }, [isLoading, user]);

  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);

      socket.on("notification", (data) => {
        addToast({
          title: "You have an upcoming appointment",
          description: data.message,
          color: "primary",
          timeout: 10000,
        });
        setNotifications((prev) => [...prev, data]);
      });

      return () => {
        socket.off("notification");
        socket.disconnect();
      };
    }
  }, [userId]);

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
      <Route path="/new-symptom" element={<NewSymptomPage />} />
      <Route path="/new-interaction" element={<NewInteractionPage />} />

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
    </Routes>
  );
}

export default App;
