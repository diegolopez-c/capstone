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

  return response.json();
}

export { createSymptomCall };
