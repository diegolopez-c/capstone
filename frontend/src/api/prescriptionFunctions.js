import { fetchUserId } from "./userFunctions";

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

//Given a medicine List and de doctors and patient id this function will:
//1.- Create a new prescription register
//2.- Using the id from the new prescription register it'll create an instance in the prescription_medicine table for each drug in the prescription
async function createPrescription(
  medicineList,
  patientId,
  doctorId,
  medicalHistoryId
) {
  const prescriptionBody = {
    patientId,
    doctorId,
    medicalHistoryId,
  };

  //Create the prescription instance
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/prescription/create-prescription`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prescriptionBody),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create the new prescription");
  }

  const newPrescription = await response.json();
  const prescriptionId = newPrescription.id;

  for (let med of medicineList) {
    const medBody = {
      medicineId: parseInt(med.medicineId),
      prescriptionId: prescriptionId,
      frequency: med.frequency,
      duration: med.duration,
      dosage: med.dosage,
      comments: med.dosage,
    };

    const newMedRes = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/prescription/add-medicine-to-prescription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medBody),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add the medicine to the new prescription");
    }
  }
}

async function fetchAllPatientPrescriptionsByEmail(patientEmail) {
  const patientId = await fetchUserId(patientEmail);

  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/prescription/get-prescriptions-by-patient/${patientId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch patients active prescriptions");
  }

  const prescriptionList = await response.json();

  return await prescriptionList;
}

async function fetchPrescriptionById(prescriptionId) {
  prescriptionId = parseInt(prescriptionId);

  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/prescription/get-prescription-by-id/${prescriptionId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch the prescription");
  }

  const prescription = await response.json();

  return await prescription;
}

export {
  fetchAllPatientPrescriptions,
  createPrescription,
  fetchAllPatientPrescriptionsByEmail,
  fetchPrescriptionById,
};
