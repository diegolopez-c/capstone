import checkPairOfDrugsInteraction from "./checkPairOfDrugsInteraction";

//This function will receive a drug list and will look for potiential allergic and bad interactions with every pair of drugs
async function checkDrugInteractions(drugList) {
  const interactionsList = [];

  for (let i = 0; i < drugList.length; i++) {
    for (let j = i + 1; j < drugList.length; j++) {
      const ans = await checkPairOfDrugsInteraction(
        drugList[i].name,
        drugList[j].name
      );
      if (ans.substring(0, 3) === "Yes") {
        interactionsList.push({
          name: `${drugList[i].name} --> ${drugList[j].name}`,
          content: ans,
        });
      }
    }
  }

  return interactionsList;
}

export default checkDrugInteractions;
