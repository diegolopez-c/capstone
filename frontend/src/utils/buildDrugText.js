// This will get the complete body of a drug fetched from the FDA API and make a complete parragraph of information regarding the drug
const fields = [
  "drug_interactions",
  "warnings",
  "warnings_and_cautions",
  "adverse_reactions",
  "precautions",
  "description",
  "indications_and_usage",
];

export default function buildDrugText(drugBody) {
  let summaryText = "";

  for (let field of fields) {
    if (drugBody[field]) {
      const content = Array.isArray(drugBody[field])
        ? drugBody[field].join(" ")
        : drugBody[field];

      summaryText += ` ${content}`;
    }
  }

  return summaryText;
}
