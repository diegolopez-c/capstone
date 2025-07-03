const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Retrieve all the patients medical records
router.get("/get-patient-medical-history/:patientId", async (req, res) => {
  const patientId = parseInt(req.params.patientId);

  try {
    const patientMedicalHistory = await prisma.medicalHistory.findMany({
      where: {
        patientId: patientId,
      },
    });

    res.status(200).json({ patientMedicalHistory });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error retrieving the medical record",
      details: error.message,
    });
  }
});

//Create a new register in the medical history
router.post("/create-medical-history", async (req, res) => {
  const { patientId, doctorId, diagnosis, notes } = req.body;

  try {
    // If it doesnt it creates the db isntance
    const newMedicalHistory = await prisma.medicalHistory.create({
      data: {
        patientId,
        doctorId,
        diagnosis,
        notes,
      },
    });

    res.status(201).json(newMedicalHistory);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error creating the medical record",
      details: error.message,
    });
  }
});

module.exports = router;
