import { useState, useCallback } from "react";
import { useEffect } from "react";
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
  Button,
} from "@heroui/react";
import { columns } from "../../utils/prescriptionTableColumns";
import { fetchAllPatientPrescriptionsByEmail } from "../../api/prescriptionFunctions";
import formatFullDate from "../../utils/formatFullDate";
import { useDisclosure } from "@heroui/react";
import PrescriptionModal from "./PrescriptionModal";

export default function MyPrescriptions() {
  const { user, isLoading } = useAuth0();
  const [prescriptionList, setPrescriptionList] = useState([]);

  //Modal Actions
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPrescription, setSelectedPrescription] = useState();

  useEffect(() => {
    async function fetchPrescriptions(email) {
      const list = await fetchAllPatientPrescriptionsByEmail(email);
      setPrescriptionList(list);
    }

    if (!isLoading && user) {
      fetchPrescriptions(user.email);
    }
  }, [isLoading, user]);

  const renderCell = useCallback((prescription, columnKey) => {
    const cellValue = prescription[columnKey];
    switch (columnKey) {
      case "createdAt":
        return formatFullDate(new Date(cellValue));
      case "status":
        switch (cellValue) {
          case "ISSUED":
            return <Chip color="warning">Issued</Chip>;
          default:
            return <Chip color="success">Dispensed</Chip>;
        }
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-3/4 min-h-screen flex flex-col items-center gap-8 py-8 overflow-scroll">
      <h1 className="text-ca-white text-3xl font-bold">
        Your Prescriptions List
      </h1>
      <Table
        aria-label="Prescription Table"
        className=" w-4/5 text-black"
        onRowAction={(key) => {
          setSelectedPrescription(key);
          onOpen();
        }}
        classNames={{
          tr: "hover:bg-ca-light-black hover:text-ca-white cursor-pointer",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={prescriptionList}
          emptyContent={"No rows to display."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PrescriptionModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedPrescription={selectedPrescription}
      />
    </div>
  );
}
