async function createAppointment(newAppointment) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/appointment/create-new-appointment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAppointment),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create the appointment");
  }

  return response.json();
}

async function checkPatientActiveAppointments(patientId) {
  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/appointment/get-active-patient-appointments/${patientId}}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch patients active appointments");
  }

  const appointmentList = await response.json();

  return await appointmentList;
}

export { createAppointment, checkPatientActiveAppointments };
