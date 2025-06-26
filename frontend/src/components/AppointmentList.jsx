import React, { useCallback, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import jsonData from "../utils/mock-appointments.json" with {type: "json"};

export default function AppointmentList() {

    useEffect(() => { 
        console.log(jsonData);
    }, [])

    const columns = [
    {
        key: "patientId",
        label: "PATIENT ID",
    },
    {
        key: "scheduleDate",
        label: "DATE",
    },
    // {
    //     key: "patientName",
    //     label: "PATIENT NAME",
    // },
    {
        key: "status",
        label: "STATUS",
    },
    ];

    const renderCell = useCallback((appointment, columnKey) => {
        const cellValue = appointment[columnKey];

        switch(columnKey){
            case "patientId":
                return cellValue;
            case "scheduleDate":
                return ;
            case "status":
                return ()
            default:
                return cellValue;
        }
    }, [])

  return (
    <Table aria-label="Appointment Table" className=" w-4/5 text-black">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={jsonData} emptyContent={"No rows to display."}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
