const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchNonDiscontinuedDrugs = require("../utils/fetchNonDiscontinuedDrugs");
const generateRandomNumber = require("../utils/generateRandomNumber");
const generateRandomDate = require("../utils/generateRandomDate");

//Get all of the medicine
router.get("/get-all-medicine", async (req, res) => {
  try {
    const medicineList = await prisma.medicine.findMany();

    res.status(200).json(medicineList);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error retrieving all the medicine",
      details: error.message,
    });
  }
});

//Register new medicine
router.post("/register-new-medicine", async (req, res) => {
  const { name, criticalThreshold, quantity, expiryDate } = req.body;

  try {
    const searchExistent = await prisma.medicine.findFirst({
      where: {
        name: name,
      },
    });

    if (searchExistent) {
      return res.status(409).json({ error: "The medicine already exist" });
    }

    const newMedicine = await prisma.medicine.create({
      data: {
        name,
        criticalThreshold,
        quantity: quantity > 0 ? quantity : 0,
        expiryDate,
      },
    });

    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error creating the medicine",
      details: error.message,
    });
  }
});

//Restock medicine
router.put("/restock-medicine", async (req, res) => {
  try {
    const { id, quantity } = req.body;

    const medicinePastRegistry = await prisma.medicine.findUnique({
      where: {
        id: id,
      },
    });

    if (medicinePastRegistry.quantity + quantity < 0) {
      res
        .status(400)
        .json({ error: "The quantity given is more than the actual stock" });
    } else {
      const updatedMedicine = await prisma.medicine.update({
        where: {
          id: id,
        },
        data: {
          quantity: medicinePastRegistry.quantity + quantity,
          updatedAt: new Date(),
        },
      });

      //TODO notification when quantity is low
      if (updatedMedicine.quantity > updatedMedicine.criticalThreshold) {
      }

      res.status(200).json(updatedMedicine);
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error changing the medicine stock",
      details: error.message,
    });
  }
});

//Populate the db with the FDA Medicine
router.post("/populate", async (req, res) => {
  try {
    const drugs = await fetchNonDiscontinuedDrugs();

    const drugData = drugs.map((d) => ({
      fdaId: d.fdaId,
      brandName: d.brandName,
      genericName: d.genericName,
      criticalThreshold: generateRandomNumber(5, 30),
      quantity: generateRandomNumber(3, 150),
    }));

    await prisma.medicine.createMany({
      data: drugData,
      skipDuplicates: true,
    });
    return res.status(201).json({ message: "Medicines created successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error creating the medicine instances",
      details: error.message,
    });
  }
});

module.exports = router;
