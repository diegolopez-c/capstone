const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
