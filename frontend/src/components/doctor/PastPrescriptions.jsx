import React from "react";

export default function PastPrescriptions({ patientId }) {
  return (
    <>
      {patientId ? (
        <div className="w-2/5 bg-ca-light-black flex flex-col items-center rounded-xl py-2">
          <h3 className="text-ca-white text-xl font-bold">
            Past Prescriptions
          </h3>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
