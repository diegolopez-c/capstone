import React, { useEffect, useState } from "react";
import { Textarea, Button, addToast } from "@heroui/react";
import formatFullDate from "../../utils/formatFullDate";
import { fetchUserId, fetchUserName } from "../../api/userFunctions";
import { createAppointment } from "../../api/appointmentFunctions";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function AppointmentDetails({
  newAppointment,
  setNewAppointment,
}) {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [doctorName, setDoctorName] = useState("");
  const [formatedAppointmentDate, setFormatedAppointmentDate] = useState("");

  async function createTheAppointment() {
    try {
      const data = await createAppointment(newAppointment);

      addToast({
        title: "Appointment Scheduled Successfully",
        description:
          "Your appointment has been scheduled successfully you will receive a notification 1 hour before the appointment hour",
        color: "success",
        timeout: 10000,
      });
    } catch (error) {
      console.error("Error creating the appointment: ", error);
    } finally {
      navigate("/patient-dashboard");
    }
  }

  useEffect(() => {
    async function fetchAppointmentData() {
      try {
        //Fetch the patient Id
        const patientId = await fetchUserId(user.email);
        setNewAppointment({ ...newAppointment, patientId });

        //Fetch doctor name
        const data = await fetchUserName(newAppointment.doctorId);
        setDoctorName(data.name + " " + data.lastname);

        //Format Date Appointemnt date
        setFormatedAppointmentDate(formatFullDate(newAppointment.scheduleDate));
      } catch (error) {
        console.error(error);
      }
    }

    fetchAppointmentData();
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col gap-6">
      <h1 className="text-ca-white text-2xl font-bold">Appointment Details</h1>
      <h3 className="text-ca-white">
        <span className="font-semibold">Doctor Name:</span> {doctorName}
      </h3>
      <h3 className="text-ca-white">
        <span className="font-semibold">Appointment Date: </span>
        {formatedAppointmentDate}
      </h3>
      <h3 className="text-ca-white font-semibold">
        Enter the reason of your appointment in a brief paragraph
      </h3>
      <Textarea
        isClearable
        className="max-w-xs text-ca-white bg-ca-black"
        onChange={(e) => {
          setNewAppointment({ ...newAppointment, reason: e.target.value });
        }}
        placeholder="Enter your description here"
      />
      <Button
        className="bg-green-300"
        onPress={() => {
          createTheAppointment();
        }}
      >
        Create Your Appointment
      </Button>
    </div>
  );
}
