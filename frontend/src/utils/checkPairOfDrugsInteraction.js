export default async function checkPairOfDrugsInteraction(drug1, drug2) {
  const prompt = `Are there any known drug interactions between ${drug1} and ${drug2}? Please answer as a clinical pharmacist would, but in a really short way trying to give advice to a doctor that has added the following 2 drugs to a new prescription he is doing. If you detect a mayor interaction start your response with the word yes if theres not a mayor interaction start with no`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI API error: ${text}`);
  }

  const data = await res.json();
  return data.choices[0].message.content.trim();
}
