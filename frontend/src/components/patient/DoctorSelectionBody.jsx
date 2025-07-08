import React, { useEffect, useState } from "react";
import { Select, SelectItem, Button, addToast, Spinner } from "@heroui/react";

export default function DoctorSelectionBody({ selectDoctor }) {
  const [selectedDoctor, setSelectedDoctor] = useState();

  const [doctorsAvailable, setDoctorsAvailable] = useState([]);

  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    async function fetchDoctorsAvailable() {
      try {
        const response = await fetch(
          import.meta.env.VITE_BASE_URL + "/user/get-doctors-available",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctorsAvailable(data);
      } catch (error) {
        addToast({
          title: "Error",
          description: error.message,
          type: "error",
        });
      } finally {
        setLoadingDoctors(false);
      }
    }
    fetchDoctorsAvailable();
  }, []);

  if (loadingDoctors) {
    return <Spinner />;
  }

  return (
    <div className="w-full flex items-center justify-center flex-col gap-6">
      <Select
        className="w-4/5"
        label="Select a doctor"
        classNames={{
          trigger: "bg-ca-white",
          content: "text-ca-black text-white",
        }}
        selectedKeys={selectedDoctor}
        onSelectionChange={(doctor) => {
          setSelectedDoctor(doctor);
        }}
      >
        {doctorsAvailable.map((doc) => {
          return (
            <SelectItem className="bg-ca-light-black" key={doc.id}>
              {doc.name}
            </SelectItem>
          );
        })}
      </Select>
      <Button
        className="bg-ca-yellow"
        onPress={() => {
          selectDoctor(selectedDoctor);
        }}
      >
        Next
      </Button>
    </div>
  );
}
