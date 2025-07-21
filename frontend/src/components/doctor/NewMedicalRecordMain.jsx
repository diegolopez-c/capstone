import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserId } from "../../api/userFunctions";
import { Tabs, Tab, Card, CardBody, Spinner, addToast } from "@heroui/react";
import PatientSelection from "./PatientSelection";
import NewMedicalRecordForm from "./NewMedicalRecordForm";

const tabSteps = ["patient-selection", "record-submission"];

export default function NewMedicalRecordMain() {
  const { user, isLoading } = useAuth0();

  //Doctors id
  const [doctorId, setDoctorId] = useState();

  //Set selected tab
  const [selectedStep, setSelectedStep] = useState("patient-selection");

  //Set Selected Patient
  const [selectedPatient, setSelectedPatient] = useState();

  //Set new medical record body
  const [newMedicalRecord, setNewMedicalRecord] = useState({});

  //Gets the doctors id
  useEffect(() => {
    if (!isLoading && user) {
      const getUserId = async () => {
        const id = await fetchUserId(user.email);
        setDoctorId(id);
      };
      getUserId();
    }
  }, [isLoading, user]);

  //Select patient function
  function selectPatient(patientBody) {
    if (!patientBody) {
      addToast({
        title: "There was an error selecting the patient",
        color: "danger",
        timeout: 10000,
      });
      return;
    }

    setSelectedPatient(patientBody);
    setNewMedicalRecord({
      ...newMedicalRecord,
      patientId: patientBody.id,
      doctorId,
    });
    setSelectedStep("record-submission");
  }

  //Body compponent depending the selected step
  let body;

  switch (selectedStep) {
    case "patient-selection":
      body = <PatientSelection selectPatient={selectPatient} />;
      break;

    case "record-submission":
      body = (
        <NewMedicalRecordForm
          patientBody={selectedPatient}
          newMedicalRecord={newMedicalRecord}
        />
      );
      break;

    default:
      body = <Spinner />;
      break;
  }

  return (
    <div className="w-3/4 min-h-screen flex flex-col items-center gap-8 py-8 overflow-scroll">
      <h1 className="text-ca-white text-3xl font-bold">
        Make New Medical Record
      </h1>

      {/** Tab Navigation */}
      <Tabs
        aria-label="Options"
        classNames={{
          tab: "bg-ca-black text-ca-white data-[selected=true]:bg-ca-light-black data-[selected=true]:text-yellow-200",
          tabList: "bg-ca-light-black",
        }}
        selectedKey={selectedStep}
        onSelectionChange={setSelectedStep}
        disabledKeys={tabSteps.filter((key) => key !== selectedStep)}
      >
        {/**Doctor Selection Tab */}
        <Tab
          key="patient-selection"
          title="1.- Select The Patient"
          className="w-full flex items-center justify-center"
        >
          <Card className="w-4/5 flex items-center justify-center bg-ca-light-black">
            <CardBody className="w-full py-6 items-center justify-center">
              {body}
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="record-submission"
          title="2.- Create The New Medical Record"
          className="w-full flex items-center justify-center"
        >
          <Card className="w-4/5 flex items-center justify-center bg-ca-light-black">
            <CardBody className="w-full py-6 items-center justify-center">
              {body}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
