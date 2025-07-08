import React, { useState } from "react";
import { Select, SelectItem, Button, addToast, Spinner } from "@heroui/react";

export default function ScheduleSelectionBody({ selectSchedule }) {
  const [selectedSchedule, setSelectedSchedule] = useState({});

  return (
    <div className="w-full flex items-center justify-center flex-col gap-6">
      ScheduleSelectionBody
      <Button
        className="bg-ca-yellow"
        onPress={() => {
          selectSchedule(selectedSchedule);
        }}
      >
        Next
      </Button>
    </div>
  );
}
