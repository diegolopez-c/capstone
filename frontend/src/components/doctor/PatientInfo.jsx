import React from "react";
import { calculateAgeWithBirthDate } from "../../utils/calculateAgeWithBirthDate";

export default function PatientInfo({ patientBody }) {
  return (
    <div className="flex dir-col gap-2">
      <p>
        <span className="font-bold">Name: </span>
        {patientBody.name}
      </p>
      <p>
        <span className="font-bold">Lastname: </span>
        {patientBody.lastname}
      </p>
      <p>
        <span className="font-bold">Age: </span>
        {calculateAgeWithBirthDate(patientBody.birthDate)}
      </p>
    </div>
  );
}
