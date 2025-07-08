//Util import
const checkDayAvailability = require("../utils/checkDayAvailability");
const calculateGapsAvailable = require("../utils/calculateGapsAvailable");
const concatHoursInMinutesToDates = require("../utils/concatHoursInMinutesToDates");

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

//This will return a list with the days the doctor is available for a new appointment
router.get("/get-doctor-days-available/:doctorId", async (req, res) => {
  try {
    const doctorId = parseInt(req.params.doctorId);

    //Set the Date from 2 weeks
    const currentDate = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(currentDate.getDate() + 14);

    //Retrieve the doctors full object
    const doctor = await prisma.user.findUnique({
      where: {
        id: doctorId,
      },
      include: {
        doctorAvailability: true,
        doctorAppointments: {
          where: {
            scheduleDate: {
              gte: currentDate,
              lte: twoWeeksFromNow,
            },
          },
          orderBy: {
            scheduleDate: "asc",
          },
        },
      },
    });

    //Check availability for each day of the next 2 weeks
    let availableDays = [];

    for (let day = 0; day < 14; day++) {
      const curDate = new Date(currentDate);
      curDate.setDate(currentDate.getDate() + day);

      //Will Use Check Availability Util Function to check if the doctor is available that day
      if (checkDayAvailability(curDate, doctor)) {
        availableDays.push(curDate);
      }
    }

    res.status(200).json(availableDays);
  } catch (error) {
    res.status(500).json({
      error: "Internal server checking the doctors day available",
      details: error.message,
    });
  }
});

router.get("/get-doctor-available-hours-for-a-day", async (req, res) => {
  let { doctorId, day } = req.body;
  day = new Date(day);
  day.setUTCHours(0, 0, 0, 0);
  let dayAfter = new Date(day);
  dayAfter.setDate(dayAfter.getDate() + 1);
  dayAfter.setUTCHours(0, 0, 0, 0);

  try {
    //Retrieve the doctors full object
    const doctor = await prisma.user.findUnique({
      where: {
        id: doctorId,
      },
      include: {
        doctorAvailability: {
          where: {
            dayOfWeek: day.getDay(),
          },
        },
        doctorAppointments: {
          where: {
            scheduleDate: {
              lte: dayAfter,
              gte: day,
            },
          },
          orderBy: {
            scheduleDate: "asc",
          },
        },
      },
    });

    //Retrieves the available 30+ minutes gaps in minute format
    const availableHours = calculateGapsAvailable(
      doctor.doctorAvailability[0],
      doctor.doctorAppointments
    );

    //Formats the hours
    const data = availableHours.map((hour) => {
      return concatHoursInMinutesToDates(hour, day);
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Internal server get the doctors available hours",
      details: error.message,
    });
  }
});

module.exports = router;
