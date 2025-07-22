const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/get-all-symptoms", async (req, res) => {
  try {
    const symptoms = await prisma.symptom.findMany();
    res.status(200).json(symptoms);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error fetching symptoms",
      details: error.message,
    });
  }
});

router.post("/create-symptom", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSymptom = await prisma.symptom.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(newSymptom);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error creating the symptom",
      details: error.message,
    });
  }
});

router.post("/create-symptom-history", async (req, res) => {
  try {
    const { medicalHistoryId, symptomId } = req.body;
    const newSymptomHistory = await prisma.symptomHistory.create({
      data: {
        medicalHistoryId,
        symptomId,
      },
    });
    res.status(201).json(newSymptomHistory);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error creating the symptom history",
      details: error.message,
    });
  }
});

router.post("/create-symptom-medicine-interaction", async (req, res) => {
  try {
    const { medicineId, symptomId, description } = req.body;
    const newInteraction = await prisma.symptomMedicineInteractions.create({
      data: {
        medicineId,
        symptomId,
        description,
      },
    });
    res.status(201).json(newInteraction);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error creating the symptom-medicine interaction",
      details: error.message,
    });
  }
});

module.exports = router;
