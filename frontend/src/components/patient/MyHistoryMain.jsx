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
import { columns } from "../../utils/historyTableColumns";
import { fetchAllPatientHistoryByEmail } from "../../api/medicalRecordFunctions";
import formatFullDate from "../../utils/formatFullDate";
import { useDisclosure } from "@heroui/react";
import HistoryModal from "./HistoryModal";

export default function MyHistoryMain() {
  const { user, isLoading } = useAuth0();
  const [historyList, setHistoryList] = useState([]);

  //Modal Actions
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedHistory, setSelectedHistory] = useState();

  useEffect(() => {
    async function fetchHistory(email) {
      const list = await fetchAllPatientHistoryByEmail(email);
      setHistoryList(list.patientMedicalHistory);
    }

    if (!isLoading && user) {
      fetchHistory(user.email);
    }
  }, [isLoading, user]);

  const renderCell = useCallback((history, columnKey) => {
    const cellValue = history[columnKey];
    switch (columnKey) {
      case "createdAt":
        return formatFullDate(new Date(cellValue));
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-3/4 min-h-screen flex flex-col items-center gap-8 py-8 overflow-scroll">
      <h1 className="text-ca-white text-3xl font-bold">
        Your Medical History List
      </h1>
      <Table
        aria-label="Medical History Table"
        className=" w-4/5 text-black"
        onRowAction={(key) => {
          setSelectedHistory(key);
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
        <TableBody items={historyList} emptyContent={"No rows to display."}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <HistoryModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedHistory={selectedHistory}
      />
    </div>
  );
}
