import React, { useEffect, useState } from "react";
import PatientSidebar from "../../components/patient/PatientSidebar";
import PatientNewAppointmentMain from "../../components/patient/PatientNewAppointmentMain";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserId } from "../../functions/userFunctions";
import { checkPatientActiveAppointments } from "../../functions/appointmentFunctions";

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

      console.log(
        isLoading,
        patientHasAppointment,
        patientId,
        activeAppointments
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
        <h1>You already have an appointment</h1>
      ) : (
        <PatientNewAppointmentMain />
      )}
    </div>
  );
}
