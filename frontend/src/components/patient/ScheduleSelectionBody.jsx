import React, { useEffect, useState } from "react";
import { Select, SelectItem, Button, addToast, Spinner } from "@heroui/react";

export default function ScheduleSelectionBody({ selectSchedule, doctorId }) {
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [loadingDays, setLoadingDays] = useState(true);
  const [doctorsAvailableDays, setDoctorsAvailableDays] = useState([]);

  useEffect(() => {
    async function fetchDoctorAvailableDays() {
      try {
        setLoadingDays(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/availability/get-doctor-days-available/${doctorId}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctors available days");
        }
        const data = await response.json();
        setDoctorsAvailableDays(data);
      } catch (error) {
        console.error("Esta mal: ", error);
      } finally {
        setLoadingDays(false);
      }
    }

    fetchDoctorAvailableDays();
  }, []);

  if (loadingDays) {
    return <Spinner />;
  }

  return (
    <div className="w-full flex items-center justify-center flex-col gap-6">
      <h1 className="text-ca-white">Select Your Appointment Date & Hour</h1>
      <Select
        className="w-4/5"
        label="Select your Appointment Day"
        classNames={{
          trigger: "bg-ca-white",
          content: "text-ca-black text-white",
        }}
        selectedKeys={selectedDay}
        onSelectionChange={(day) => {
          setSelectedDay(day);
        }}
      >
        {doctorsAvailableDays.map((daytime) => {
          return (
            <SelectItem className="bg-ca-light-black" key={daytime}>
              {new Date(daytime).toDateString()}
            </SelectItem>
          );
        })}
      </Select>
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
