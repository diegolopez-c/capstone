import React from "react";
import {
  Input,
  Button,
  Textarea,
  Table,
  TableCell,
  TableRow,
  TableColumn,
  TableBody,
  TableHeader,
} from "@heroui/react";
import { useState } from "react";
import MedicineTypeaheadSearchbar from "./MedicineTypeaheadSearchbar";

export default function MedicineSelection({
  prescriptionMedicineList,
  setPrescriptionMedicineList,
  packPrescription,
}) {
  const [curMedicine, setCurMedicine] = useState({});

  function addMedicineToMedicineList(specifications) {
    setPrescriptionMedicineList([
      ...prescriptionMedicineList,
      {
        name: curMedicine.brandName,
        frequency: specifications.frequency,
        duration: specifications.duration,
        dosage: specifications.dosage,
        comments: specifications.dosage,
      },
    ]);
  }

  return (
    <div className="w-3/4 flex flex-col items-center justify-center gap-10 py-8">
      <div className="flex flex-col w-full items-center justify-center gap-6">
        <h3 className="text-ca-white text-xl font-bold">Choose Medicine</h3>
        <div className="w-full">
          <MedicineTypeaheadSearchbar
            setSelectedMedicine={setCurMedicine}
            selectedMedicine={curMedicine}
          />
        </div>
        <div className="w-full flex">
          <form
            className="w-1/2 p-2 flex flex-col gap-4 items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              addMedicineToMedicineList(
                Object.fromEntries(new FormData(e.currentTarget))
              );
            }}
          >
            <Input name="frequency" label="Frequency" />
            <Input name="duration" label="Duration" />
            <Input name="dosage" label="Dosage" />
            <Textarea className="max-h-xs" label="Comments" />
            <Button type="submit">Add Medicine</Button>
          </form>
          <div className="w-1/2 p-4">
            <Table
              aria-label="Table for patient medical records"
              maxTableHeight={400}
              isVirtualized
            >
              <TableHeader>
                <TableColumn>Medicine List</TableColumn>
              </TableHeader>
              <TableBody>
                {prescriptionMedicineList.map((medicine, index) => {
                  return (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-300 cursor-pointer"
                    >
                      <TableCell className="flex items-center gap-4">
                        {medicine.name}{" "}
                        <Button
                          size="sm"
                          color="danger"
                          onPress={() => {
                            setPrescriptionMedicineList(
                              prescriptionMedicineList.filter(
                                (m, i) => i !== index
                              )
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <Button
          onPress={() => {
            packPrescription();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
