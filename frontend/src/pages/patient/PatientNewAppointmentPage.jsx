import React, { useEffect, useState } from "react";
import PatientSidebar from "../../components/patient/PatientSidebar";
import PatientNewAppointmentMain from "../../components/patient/PatientNewAppointmentMain";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserId } from "../../api/userFunctions";
import { checkPatientActiveAppointments } from "../../api/appointmentFunctions";
import AlreadyAppointmentMain from "../../components/patient/AlreadyAppointmentMain";

export default function PatientNewAppointmentPage() {
  const { user, isLoading } = useAuth0();
  const [patientHasAppointment, setPatientHasAppointment] = useState(false);

  //Check if the patient has active appointments
  useEffect(() => {
    async function fetchActiveAppointments() {
      const patientId = await fetchUserId(user.email);

      const activeAppointments = await checkPatientActiveAppointments(
        patientId
      );

      if (activeAppointments.length >= 1) {
        setPatientHasAppointment(true);
      }
    }

    if (!isLoading) {
      fetchActiveAppointments();
    }
  }, [isLoading]);

  return (
    <div className="h-screen flex">
      <PatientSidebar />

      {/* TODO Make a  */}
      {patientHasAppointment ? (
        <AlreadyAppointmentMain />
      ) : (
        <PatientNewAppointmentMain />
      )}
    </div>
  );
}
