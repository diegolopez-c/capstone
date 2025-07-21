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

  return medicalRecordList;
}

async function createMedicalRecord(medicalRecordBody) {
  //Create the medical record
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/medical-history/create-medical-history`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicalRecordBody),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create the new medical history registry");
  }

  const medicalRecord = await response.json();

  return medicalRecord;
}

export { fetchAllPatientMedicalRecords, createMedicalRecord };
