const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Retrieve prescriptions by patient Id
router.get("/get-prescriptions-by-patient/:patientId", async (req, res) => {
  const patientId = parseInt(req.params.patientId);

  try {
    const prescriptionList = await prisma.prescription.findMany({
      where: {
        patientId: patientId,
      },
    });

    res.status(200).json(prescriptionList);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error retieving the patient prescriptions",
      details: error.message,
    });
  }
});

//Get prescription by Id
router.get("/get-prescription-by-id/:prescriptionId", async (req, res) => {
  const prescriptionId = parseInt(req.params.prescriptionId);

  try {
    const prescription = await prisma.prescription.findUnique({
      where: {
        id: prescriptionId,
      },
    });

    //If the prescription doesn't exist
    if (!prescription) {
      res.status(404).json({
        error: "The prescription you're searching for doesn't exist",
      });
    }

    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error retrieving the prescription",
      details: error.message,
    });
  }
});

//Retrieve medicine list of prescription
router.get(
  "/get-medicine-by-prescription/:prescriptionId",
  async (req, res) => {
    const prescriptionId = parseInt(req.params.prescriptionId);

    try {
      const medicineList = await prisma.prescription_Medicine.findMany({
        where: {
          prescriptionId: prescriptionId,
        },
        include: {
          medicine: {
            select: {
              brandName: true,
              genericName: true,
            },
          },
        },
      });

      res.status(200).json(medicineList);
    } catch (error) {
      res.status(500).json({
        error:
          "Internal server error retrieving the medicine of the prescription",
        details: error.message,
      });
    }
  }
);

//Make new prescription
router.post("/create-prescription", async (req, res) => {
  const { patientId, doctorId, medicalHistoryId, status } = req.body;

  try {
    const newPrescription = await prisma.prescription.create({
      data: {
        patientId,
        doctorId,
        medicalHistoryId,
        status: status || "ISSUED",
      },
    });

    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error creating the prescription",
      details: error.message,
    });
  }
});

//Add medicine to prescription
router.post("/add-medicine-to-prescription", async (req, res) => {
  const { medicineId, prescriptionId, dosage, frequency, duration, comments } =
    req.body;

  try {
    const newMedicinePrescription = await prisma.prescription_Medicine.create({
      data: {
        medicineId,
        prescriptionId,
        dosage,
        frequency,
        duration,
        comments,
      },
    });

    res.status(201).json(newMedicinePrescription);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error creating the medicine_prescription",
      details: error.message,
    });
  }
});

//Dispense description
router.put("/dispense-prescription/:prescriptionId", async (req, res) => {
  const prescriptionId = parseInt(req.params.prescriptionId);

  try {
    const updatedPrescription = await prisma.prescription.update({
      where: {
        id: prescriptionId,
      },

      data: {
        status: "DISPENSED",
      },
    });

    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error changing the prescription status",
      details: error.message,
    });
  }
});

module.exports = router;
