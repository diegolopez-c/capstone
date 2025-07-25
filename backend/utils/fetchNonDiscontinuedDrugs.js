async function fetchNonDiscontinuedDrugs() {
  const response = await fetch(
    `https://api.fda.gov/drug/label.json?search=products.marketing_status=1&limit=1000&skip=25000`
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching the non discontinued drugs: ${response.status}`
    );
  }

  const data = await response.json();

  const drugs = data.results.map((drug) => ({
    fdaId: drug.id,
    brandName: drug.openfda.brand_name ? drug.openfda.brand_name[0] : "N/A",
    genericName: drug.openfda.generic_name
      ? drug.openfda.generic_name[0]
      : "N/A",
  }));

  return drugs.filter((d) => d.brandName !== "N/A" || d.genericName !== "N/A");
}

module.exports = fetchNonDiscontinuedDrugs;
