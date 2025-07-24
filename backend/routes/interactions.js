const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/find-medicine-symptom-interactions", async (req, res) => {
  const { medicineIds, symptomIds } = req.body;

  if (!Array.isArray(medicineIds) || !Array.isArray(symptomIds)) {
    return res
      .status(400)
      .json({ error: "medicineIds and symptomIds must be arrays" });
  }

  try {
    const interactions = await prisma.symptomMedicineInteractions.findMany({
      where: {
        medicineId: { in: medicineIds },
        symptomId: { in: symptomIds },
      },
      include: {
        medicine: { select: { id: true, brandName: true, genericName: true } },
        symptom: { select: { id: true, name: true, description: true } },
      },
    });

    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error fetching interactions",
      details: error.message,
    });
  }
});

router.post("/create-new-medicine-interaction", async (req, res) => {
  try {
    const { medicineAId, medicineBId, description } = req.body;
    const newInteraction = await prisma.medicineInteraction.create({
      data: {
        medicineAId,
        medicineBId,
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
