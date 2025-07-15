import React from "react";
import { calculateAgeWithBirthDate } from "../../utils/calculateAgeWithBirthDate";

export default function PatientInfo({ patientBody }) {
  return (
    <>
      {patientBody ? (
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-bold">Name: </span>
            {patientBody.name || "Not Provided"}
          </p>
          <p>
            <span className="font-bold">Lastname: </span>
            {patientBody.lastname || "Not Provided"}
          </p>
          <p>
            <span className="font-bold">Age: </span>
            {calculateAgeWithBirthDate(patientBody.birthDate) || "Not Provided"}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
