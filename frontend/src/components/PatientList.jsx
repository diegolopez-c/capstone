import React from "react";
import React, { useCallback, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  getKeyValue,
  Chip,
} from "@heroui/react";
import jsonData from "../utils/mock-patients.json";

export default function PatientList() {
  // Appointment table columns
  const columns = [
    {
      key: "patientId",
      label: "PATIENT ID",
    },
    // {
    //     key: "patientName",
    //     label: "PATIENT NAME",
    // },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  // Format to a String User Friendly format
  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  // Render the cells giving the type
  // Chip component for the appointment status
  // Formated date for the Date & Hour of the appointment
  // Just the string for everything else

  const renderCell = useCallback((appointment, columnKey) => {
    const cellValue = appointment[columnKey];
    switch (columnKey) {
      case "scheduleDate":
        return formatDateTime(new Date(cellValue));
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
          <div className="flex items-center justify-between w-full">
            <Tooltip
              className="capitalize"
              color="success"
              content="Confirm Appointment"
            >
              <i className="fa-solid fa-check-double text-green-600 cursor-pointer" />
            </Tooltip>
            <Tooltip
              className="capitalize"
              color="primary"
              content="Reschedule Appointment"
            >
              <i className="fa-solid fa-clock-rotate-left text-blue-600 cursor-pointer" />
            </Tooltip>
            <Tooltip
              className="capitalize"
              color="danger"
              content="Cancel Appointment"
            >
              <i className="fa-solid fa-trash text-red-600 cursor-pointer" />
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Appointment Table" className=" w-4/5 text-black">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={jsonData} emptyContent={"No rows to display."}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
