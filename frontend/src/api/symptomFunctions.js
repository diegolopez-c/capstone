// This function should receive a body like this:
// {
//     name: String
//     description: String
// }
async function createSymptomCall(newSymptomBody) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/symptom/create-new-symptom`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSymptomBody),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create the symptom");
  }

  return await response.json();
}

async function createInteractionCall(interactionBody) {
  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/symptom/create-new-symptom-medicine-interaction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interactionBody),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create the symptom");
  }

  return await response.json();
}

async function createSymptomRecordsCall(symptomsList, historyId) {
  let requestBody = [];

  for (let s of symptomsList) {
    requestBody.push({
      medicalHistoryId: historyId,
      symptomId: s.id,
    });
  }

  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/symptom/create-new-symptom-history`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create the symptom");
  }

  return await response.json();
}

async function fetchAllSymptom() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/symptom/get-all-symptoms`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch all symptoms");
  }

  const symptomList = await response.json();

  return symptomList;
}

export {
  createSymptomCall,
  fetchAllSymptom,
  createInteractionCall,
  createSymptomRecordsCall,
};
