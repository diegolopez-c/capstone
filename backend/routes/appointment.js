const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Get Patient Appointment History
router.get("/get-all-patient-appointments/:patientId", async (req, res) => {
  const patientId = parseInt(req.params.patientId);

  try {
    const appointmentList = await prisma.appointment.findMany({
      where: {
        patientId: patientId,
      },
    });

    res.status(200).json(appointmentList);
  } catch (error) {
    res.status(500).json({
      error:
        "Internal server error retreving the patients active appointment list",
      details: error.message,
    });
  }
});

//Get Active Patient Appointments it only should be one
router.get("/get-active-patient-appointments/:patientId", async (req, res) => {
  const patientId = parseInt(req.params.patientId);

  try {
    const appointmentList = await prisma.appointment.findMany({
      where: {
        patientId: patientId,
        status: { in: ["PENDING", "CONFIRMED", "RESCHEDULED"] },
      },
    });

    res.status(200).json(appointmentList);
  } catch (error) {
    res.status(500).json({
      error:
        "Internal server error retreving the patients active appointment list",
      details: error.message,
    });
  }
});

//Get Active DOCTOR Appointments
router.get("/get-active-doctor-appointments/:doctorId", async (req, res) => {
  const doctorId = parseInt(req.params.doctorId);

  try {
    const appointmentList = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
        status: { in: ["PENDING", "CONFIRMED", "RESCHEDULED"] },
      },
    });

    res.status(200).json(appointmentList);
  } catch (error) {
    res.status(500).json({
      error:
        "Internal server error retreving the doctors active appointment list",
      details: error.message,
    });
  }
});

//Get All DOCTOR Appointments
router.get("/get-all-doctor-appointments/:doctorId", async (req, res) => {
  const doctorId = parseInt(req.params.doctorId);

  try {
    const appointmentList = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
      },
    });

    res.status(200).json(appointmentList);
  } catch (error) {
    res.status(500).json({
      error:
        "Internal server error retreving the doctors active appointment list",
      details: error.message,
    });
  }
});

//Create a new Appointment
router.post("/create-new-appointment", async (req, res) => {
  const { patientId, doctorId, status, reason, scheduleDate } = req.body;

  try {
    //If a patient already has an appointment
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        patientId: patientId,

        //IF THE APPOINTMENT IS NOT CANCELLED OR COMPLETED A NEW APPOINTMENT CANNOT BE SCHEDULED FOR THAT PATIENT
        status: { in: ["PENDING", "CONFIRMED", "RESCHEDULED"] },
      },
    });

    //If the schedule date is invalid (in the past or bad format)
    //Check if the date is valid
    if (new Date(scheduleDate) < new Date()) {
      res.status(400).json({ error: "The date for the schedule is not valid" });
    }

    if (existingAppointment) {
      return res
        .status(409)
        .json({ error: "The patient already has an appointment" });
    }

    // If it doesnt it creates the db isntance
    const newAppointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        status: status || "PENDING",
        reason,
        scheduleDate,
      },
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error creating the appointment",
      details: error.message,
    });
  }
});

//Reschedule an appointment
router.put("/reschedule-appointment", async (req, res) => {
  try {
    const { id, scheduleDate } = req.body;

    //Check if the date is valid
    if (new Date(scheduleDate) < new Date()) {
      res.status(400).json({ error: "The date for the schedule is not valid" });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        scheduleDate: scheduleDate,
        status: "RESCHEDULED",
      },
    });

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error rescheduling the appointment",
      details: error.message,
    });
  }
});

//Change appointment status
router.put("/change-appointment-status", async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error rescheduling the appointment",
      details: error.message,
    });
  }
});

module.exports = router;
