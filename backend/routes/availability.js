const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/create-doctor-schedule", async (req, res) => {
  const { doctorId, dayOfWeek, startTime, endTime } = req.body;

  try {
    //If the doctor already has an scheudle
    const existingAvailability = await prisma.doctorAvailability.findMany({
      where: { doctorId: doctorId, dayOfWeek: dayOfWeek },
    });

    //If already exists it updates the existing schedule
    if (existingAvailability.length > 0) {
      const modifiedAvailability = await prisma.doctorAvailability.update({
        where: {
          id: existingAvailability[0].id,
          doctorId: doctorId,
        },
        data: {
          dayOfWeek,
          startTime,
          endTime,
        },
      });

      res.status(200).json(modifiedAvailability);
    } else {
      // If it doesnt it creates the db isntance
      const newAvailability = await prisma.doctorAvailability.create({
        data: {
          doctorId,
          dayOfWeek,
          startTime,
          endTime,
        },
      });

      res.status(201).json(newAvailability);
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error creating the availability",
      details: error.message,
    });
  }
});

module.exports = router;
