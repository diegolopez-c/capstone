//this function is the key, it will retrieve the medical record interactions with a given medicine list
//But first of all it needs to pack the symptoms of the medical records ids and the ids from the medicine list
async function fetchInteractionsCall(medicalRecordId, medicineList) {
  //1.- Fetch records complete info with the given id
  const medicalHistoryResponse = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/medical-history/get-medical-history-by-id/${medicalRecordId}`,
    {
      method: "GET",
    }
  );

  if (!medicalHistoryResponse.ok) {
    throw new Error("Failed to fetch medical history");
  }

  const medicalHistory = await medicalHistoryResponse.json();

  //2.- Extract Symptom List from medical history response
  const symptomIdList = medicalHistory.symptoms.map((s) => {
    return s.symptomId;
  });

  //3.- Extract Medicine Ids from the medicine list
  const medicineIdList = medicineList.map((m) => {
    return m.medicineId;
  });

  //4.- Call the API to fetch all the interactions between the symptoms list and the medicine list
  const interactionListResponse = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/interaction/find-medicine-symptom-interactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medicineIds: medicineIdList,
        symptomIds: symptomIdList,
      }),
    }
  );

  if (!interactionListResponse.ok) {
    throw new Error("Failed to fetch interactions");
  }

  const interactionList = await interactionListResponse.json();

  return interactionList;
}

export { fetchInteractionsCall };
