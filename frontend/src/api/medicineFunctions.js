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

export { fetchAllMedicine };
