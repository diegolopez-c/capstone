import React from "react";

export default function PastMedicalRecords({ patientId }) {
  return (
    <>
      {patientId ? (
        <div className="w-2/5 bg-ca-black flex flex-col items-center rounded-xl py-2">
          <h3 className="text-ca-white text-xl font-bold">
            Past Medical Records
          </h3>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
