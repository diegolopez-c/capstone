async function fetchAllMedicine() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/medicine/get-all-medicine`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch all medicine");
  }

  const medicineList = await response.json();

  return medicineList;
}

async function fetchMedicineDetailedInfo(medicineFdaId) {
  const response = await fetch(
    `https://api.fda.gov/drug/label.json?search=id:${medicineFdaId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch the medicine's detailed info");
  }

  const medicineInfo = await response.json();

  const results = medicineInfo.results;
  const drug = results[0];
  let purpose = drug.purpose ? drug.purpose.join(", ") : "Not available";
  let adverseReactions = drug.warnings
    ? drug.warnings.join(", ")
    : "Not available";

  return [
    purpose,
    adverseReactions.length < 600
      ? adverseReactions
      : adverseReactions.substring(0, 600) + "...",
  ];
}

async function fetchMedicineInteractions(medicineFdaId) {
  const response = await fetch(
    `https://api.fda.gov/drug/label.json?search=id:${medicineFdaId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch the medicine's detailed info");
  }

  const medicineInfo = await response.json();

  //Return the drug_interactions field if existent
  return medicineInfo.results[0]?.drug_interactions;
}

async function getMedicineByPrescription(prescriptionId) {
  prescriptionId = parseInt(prescriptionId);

  const response = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/prescription/get-medicine-by-prescription/${prescriptionId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch medicine for that prescription");
  }

  const medicineList = await response.json();

  return medicineList;
}

export {
  fetchAllMedicine,
  fetchMedicineDetailedInfo,
  fetchMedicineInteractions,
  getMedicineByPrescription,
};
