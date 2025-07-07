import React, { useState } from "react";
import { Select, SelectItem, Button, addToast } from "@heroui/react";

export default function DoctorSelectionBody({ selectDoctor }) {
  const [selectedDoctor, setSelectedDoctor] = useState();

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
        <SelectItem className="bg-ca-light-black" key="YO">
          gurt
        </SelectItem>
        <SelectItem className="bg-ca-light-black" key="KANYE">
          WEST
        </SelectItem>
        <SelectItem className="bg-ca-light-black" key="CHINO">
          PACAS
        </SelectItem>
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
