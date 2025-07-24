import React from "react";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import {
  cancelAppointment,
  fetchAllPatientAppointments,
} from "../../api/appointmentFunctions";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
  addToast,
} from "@heroui/react";
import { columns } from "../../utils/appointmentTableColumns";
import formatFullDate from "../../utils/formatFullDate";

export default function PatientAppointment() {
  const { user, isLoading } = useAuth0();
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    async function fetchAppointments(email) {
      const list = await fetchAllPatientAppointments(email);
      setAppointmentList(list);
    }

    if (!isLoading && user) {
      fetchAppointments(user.email);
    }
  }, [isLoading, user]);

  async function cancelAppointmentById(appointmentId) {
    try {
      const updatedAppointment = await cancelAppointment(appointmentId);
      addToast({
        title: "Appointment Cancelled Successfully",
        description:
          "Your appointment has been cancelled successfully the changes will appear soon",
        color: "success",
        timeout: 10000,
      });
    } catch (e) {
      console.error(e);
      addToast({
        title: "There was an error cancelling your appointment",
        description: "Your appointment has been cancelled unsuccessfully",
        color: "danger",
        timeout: 10000,
      });
    }
  }

  const renderCell = useCallback((appointment, columnKey) => {
    const cellValue = appointment[columnKey];
    switch (columnKey) {
      case "scheduleDate":
        return formatFullDate(new Date(cellValue));
      case "status":
        switch (cellValue) {
          case "CANCELLED":
            return <Chip color="danger">Cancelled</Chip>;
          case "CONFIRMED":
            return <Chip color="primary">Confirmed</Chip>;
          case "RESCHEDULED":
            return <Chip color="secondary">Rescheduled</Chip>;
          case "COMPLETED":
            return <Chip color="success">Completed</Chip>;
          default:
            return <Chip color="warning">Pending</Chip>;
        }
      case "actions":
        return (
          <div className="flex items-center justify-center w-full">
            {appointment.status === "COMPLETED" ||
            appointment.status === "CANCELLED" ? (
              <p>No Actions Available</p>
            ) : (
              <Tooltip
                className="capitalize"
                color="danger"
                content="Cancel Appointment"
              >
                <i
                  onClick={() => {
                    cancelAppointmentById(appointment.id);
                  }}
                  className="fa-solid fa-trash text-red-600 cursor-pointer"
                />
              </Tooltip>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-3/4 min-h-screen flex flex-col items-center gap-8 py-8 overflow-scroll">
      <h1 className="text-ca-white text-3xl font-bold">
        Your Appointments List
      </h1>
      <Table aria-label="Appointment Table" className=" w-4/5 text-black">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={appointmentList} emptyContent={"No rows to display."}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
