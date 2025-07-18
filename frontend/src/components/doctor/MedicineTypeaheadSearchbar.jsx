import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Spinner,
  addToast,
} from "@heroui/react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllMedicine } from "../../api/medicineFunctions";

export default function MedicineTypeaheadSearchbar({ setSelectedMedicine }) {
  const [medicineList, setMedicineList] = useState([]);
  const [isLoadingMedicine, setIsLoadingMedicine] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function getMedicine() {
      try {
        setIsLoadingMedicine(true);

        const response = await fetchAllMedicine();

        setMedicineList(response);
        setIsLoadingMedicine(false);
      } catch (error) {
        console.error(error);
        addToast({
          title: "There was an error fetching the drugs available",
          description:
            "There was an error fetching the drugs available, try again later",
          color: "danger",
          timeout: 10000,
        });
      }
    }

    getMedicine();
  }, []);

  const myFilter = (textValue, inputValue) => {
    if (inputValue.length === 0) {
      return true;
    }

    inputValue = inputValue.toLowerCase();

    return textValue.includes(inputValue);
  };

  if (isLoadingMedicine) {
    return <Spinner />;
  }

  return (
    <Autocomplete
      allowsCustomValue
      isVirtualized
      defaultFilter={myFilter}
      defaultItems={medicineList}
      label="Medicine"
      placeholder="Search a Medicine"
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSelectionChange={(key) => {
        const selected = medicineList.find((item) => item.id === parseInt(key));
        setSelectedMedicine(selected);
      }}
    >
      {(item) => {
        return (
          <AutocompleteItem
            className="text-ca-light-black override-dropdown-item"
            key={item.id}
            textValue={`${item?.brandName} ${item?.genericName}`}
          >
            {`${item.brandName || "N/A"} - ${
              item.genericName || "N/A"
            }`.substring(0, 60) + "..."}
          </AutocompleteItem>
        );
      }}
    </Autocomplete>
  );
}
