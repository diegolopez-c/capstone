import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Spinner,
  addToast,
} from "@heroui/react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllSymptom } from "../../api/symptomFunctions";

export default function SymptomTypeaheadSearchbar({ setSelectedSymptom }) {
  const [symptomList, setSymptomList] = useState([]);
  const [isLoadingSymptom, setIsLoadingSymptom] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function getSymptom() {
      try {
        setIsLoadingSymptom(true);

        const response = await fetchAllSymptom();

        setSymptomList(response);
        setIsLoadingSymptom(false);
      } catch (error) {
        console.error(error);
        addToast({
          title: "There was an error fetching the symptoms available",
          description:
            "There was an error fetching the symptoms available, try again later",
          color: "danger",
          timeout: 10000,
        });
      }
    }

    getSymptom();
  }, []);

  const myFilter = (textValue, inputValue) => {
    if (inputValue.length === 0) {
      return true;
    }

    inputValue = inputValue.toLowerCase();

    return textValue.includes(inputValue);
  };

  if (isLoadingSymptom) {
    return <Spinner />;
  }

  return (
    <Autocomplete
      allowsCustomValue
      isVirtualized
      defaultFilter={myFilter}
      defaultItems={symptomList}
      label="Symptom"
      placeholder="Search a Symptom"
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSelectionChange={(key) => {
        const selected = symptomList.find((item) => item.id === parseInt(key));
        setSelectedSymptom(selected);
      }}
    >
      {(item) => {
        return (
          <AutocompleteItem
            className="text-ca-light-black override-dropdown-item"
            key={item.id}
            textValue={`${item?.name} - ${item?.description}`}
          >
            {`${item.name || "N/A"} - ${item.description || "N/A"}`.substring(
              0,
              60
            ) + "..."}
          </AutocompleteItem>
        );
      }}
    </Autocomplete>
  );
}
