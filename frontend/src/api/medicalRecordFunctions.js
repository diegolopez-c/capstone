async function fetchAllPatientMedicalRecords(patientId) {
  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/medical-history/get-patient-medical-history/${patientId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch patients medical record");
  }

  const medicalRecordList = await response.json();

  return await medicalRecordList;
}

export { fetchAllPatientMedicalRecords };
