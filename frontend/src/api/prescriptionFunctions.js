async function fetchAllPatientPrescriptions(patientId) {
  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/prescription/get-prescriptions-by-patient/${patientId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch patients prescription record");
  }

  const prescriptionsList = await response.json();

  return await prescriptionsList;
}

export { fetchAllPatientPrescriptions };
