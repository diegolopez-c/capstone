import { fetchUserId } from "./userFunctions";

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

async function fetchAllPatientHistoryByEmail(patientEmail) {
  const patientId = await fetchUserId(patientEmail);

  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/medical-history/get-patient-medical-history/${patientId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch patient medical history");
  }

  const medicalHistoryList = await response.json();

  return medicalHistoryList;
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

async function fetchHistoryById(medicalRecordId) {
  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/medical-history/get-medical-history-by-id/${medicalRecordId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch medical history");
  }

  const medicalHistory = await response.json();

  return medicalHistory;
}

export {
  fetchAllPatientMedicalRecords,
  createMedicalRecord,
  fetchAllPatientHistoryByEmail,
  fetchHistoryById,
};
