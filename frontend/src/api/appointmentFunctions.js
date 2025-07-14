import { fetchUserId } from "./userFunctions";

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
    }/appointment/get-active-patient-appointments/${patientId}`,
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

async function fetchAllPatientAppointments(patientEmail) {
  const patientId = await fetchUserId(patientEmail);

  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/appointment/get-all-patient-appointments/${patientId}`,
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

async function fetchAllDoctorAppointments(doctorEmail) {
  const doctorId = await fetchUserId(doctorEmail);

  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/appointment/get-all-doctor-appointments/${doctorId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch doctors appointments");
  }

  const appointmentList = await response.json();

  return await appointmentList;
}

async function cancelAppointment(appointmentId) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/appointment/change-appointment-status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: appointmentId,
        status: "CANCELLED",
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to cancel the appointment");
  }

  const updatedAppointment = await response.json();

  return updatedAppointment;
}

async function confirmAppointment(appointmentId) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/appointment/change-appointment-status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: appointmentId,
        status: "CONFIRMED",
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to confirm the appointment");
  }

  const updatedAppointment = await response.json();

  return updatedAppointment;
}

async function completeAppointment(appointmentId) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/appointment/change-appointment-status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: appointmentId,
        status: "COMPLETED",
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to complete the appointment");
  }

  const updatedAppointment = await response.json();

  return updatedAppointment;
}

export {
  createAppointment,
  checkPatientActiveAppointments,
  fetchAllPatientAppointments,
  cancelAppointment,
  fetchAllDoctorAppointments,
  confirmAppointment,
  completeAppointment,
};
