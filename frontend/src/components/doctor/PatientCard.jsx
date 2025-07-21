import React from "react";
import formatFullDate from "../../utils/formatFullDate";

export default function PatientCard({ patientBody }) {
  const { birthDate, email, gender, height, id, lastname, name, weight } =
    patientBody || {};
  return (
    <div className="max-w-md mx-auto bg-ca-white rounded-md p-6 space-y-3">
      <h2 className="text-xl font-semibold border-b pb-2">
        Patient Information
      </h2>
      <p>
        <span className="font-medium">Name:</span> {name || "Not Provided"}
      </p>
      <p>
        <span className="font-medium">Lastname:</span>{" "}
        {lastname || "Not Provided"}
      </p>
      <p>
        <span className="font-medium">Email:</span> {email || "Not Provided"}
      </p>
      <p>
        <span className="font-medium">Birth Date:</span>{" "}
        {formatFullDate(birthDate)}
      </p>
      <p>
        <span className="font-medium">Gender:</span> {gender || "Not Provided"}
      </p>
      <p>
        <span className="font-medium">Height:</span> {height || "Not Provided"}
      </p>
      <p>
        <span className="font-medium">Weight:</span> {weight || "Not Provided"}
      </p>
      <p>
        <span className="font-medium">ID:</span> {id ?? "Not Provided"}
      </p>
    </div>
  );
}
