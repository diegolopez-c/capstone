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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { useState } from "react";
import MedicineTypeaheadSearchbar from "./MedicineTypeaheadSearchbar";
import { fetchMedicineDetailedInfo } from "../../api/medicineFunctions";
import checkPairOfDrugsInteraction from "../../utils/checkPairOfDrugsInteraction";
import InteractionsModal from "./InteractionsModal";

export default function MedicineSelection({
  prescriptionMedicineList,
  setPrescriptionMedicineList,
  packPrescription,
}) {
  const [curMedicine, setCurMedicine] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  async function addMedicineToMedicineList(specifications) {
    setPrescriptionMedicineList([
      ...prescriptionMedicineList,
      {
        medicineId: curMedicine.id,
        medicineFdaId: curMedicine.fdaId,
        medicineDetails: await fetchMedicineDetailedInfo(curMedicine.fdaId),
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
            <Button type="submit" className="bg-ca-mint">
              Add Medicine
            </Button>
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
                        <Popover
                          placement="bottom"
                          showArrow={true}
                          className="text-ca-black"
                        >
                          <PopoverTrigger>
                            <i className="fa-solid fa-circle-info text-xl text-ca-dark-blue hover:text-ca-mint" />
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                {medicine.name} Info
                              </div>
                              <div className="text-tiny">
                                {medicine.medicineDetails[0]}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <Popover
                          placement="bottom"
                          showArrow={true}
                          className="text-ca-black"
                        >
                          <PopoverTrigger>
                            <i className="fa-solid fa-triangle-exclamation text-xl text-yellow-500 hover:text-ca-yellow" />
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                {medicine.name} Adverse Reactions and Warnings
                              </div>
                              <div className="text-tiny">
                                {medicine.medicineDetails[1]}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="w-full flex items-center justify-center gap-8">
          <Button color="danger" onPress={() => {}}>
            Cancel
          </Button>
          <Button
            className="bg-ca-yellow"
            onPress={() => {
              setModalOpen(true);
            }}
          >
            Interactions
          </Button>
          <Button
            color="success"
            onPress={() => {
              packPrescription();
            }}
          >
            Next
          </Button>
        </div>
      </div>
      <InteractionsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        prescriptionMedicineList={prescriptionMedicineList}
      />
    </div>
  );
}
