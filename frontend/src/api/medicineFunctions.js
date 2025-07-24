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
  let adverseReactions = drug.adverse_reactions
    ? drug.adverse_reactions.join(", ")
    : "Not available";

  return [
    purpose,
    adverseReactions.length < 600
      ? adverseReactions
      : adverseReactions.substring(0, 600) + "...",
  ];
}

export { fetchAllMedicine, fetchMedicineDetailedInfo };
