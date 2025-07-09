const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Util to extract the time in minutes so I can deduct the difference
function getTimeInMinutes(date) {
  return date.getHours() * 60 + date.getMinutes();
}

router.get("/get-user-by-email/:userEmail", async (req, res) => {
  const email = req.params.userEmail;

  try {
    const getUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!getUser) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error searching for the user",
      details: error.message,
    });
  }
});

router.post("/create-new-user", async (req, res) => {
  const { name, lastname, email, birthDate, role } = req.body;

  try {
    //If as user already exist it doesnt creates the user
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // If it doesnt it creates the db isntance
    const newUser = await prisma.user.create({
      data: {
        name,
        lastname,
        email,
        birthDate,
        role,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

router.put("/update-user-info", async (req, res) => {
  try {
    const { email } = req.body;
    const updateUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: { ...req.body, updatedAt: new Date() },
    });

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error updating the user",
      details: error.message,
    });
  }
});

router.delete("/delete-user", async (req, res) => {
  try {
    const { email } = req.body;
    const deleteUser = await prisma.user.delete({
      where: {
        email: email,
      },
    });

    res.status(204).json({ message: "User deleted correctly" });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error deleting the user",
      details: error.message,
    });
  }
});

//Get user name by id
router.get("/get-user-name-by-id/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const getUser = await prisma.user.findUnique({
      select: {
        name: true,
        lastname: true,
      },
      where: {
        id: userId,
      },
    });

    if (!getUser) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error fetching the doctors name",
      details: error.message,
    });
  }
});

//Return the doctors available for the next 2 weeks
router.get("/get-doctors-available", async (req, res) => {
  try {
    // Super query to get doctors with available appointments
    // The doctors spare time between appointmnets should be at least 30 min
    // The spare time should be in between the doctor_availability hours
    // The appointment cannot be scheduled with more than 2 weeks of anticipation to avoid scalpers

    //Set the Date from 2 weeks
    const currentDate = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(currentDate.getDate() + 14);

    //Retrieve all the doctors
    const doctorsList = await prisma.user.findMany({
      where: {
        role: "DOCTOR",
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

    //Filter doctors to only show the available ones
    const availableDoctors = doctorsList.filter((doctor) => {
      for (let day = 0; day < 14; day++) {
        //Cur day will be the day checking for the availability
        const curDate = new Date(currentDate);
        curDate.setDate(currentDate.getDate() + day);

        //First lets check if the doctor is available that day of the week
        let doctorSchedule;
        for (let a of doctor.doctorAvailability) {
          if (a.dayOfWeek === curDate.getDay()) {
            doctorSchedule = a;
          }
        }

        //If it the doctor doesn't work that day it will skip the day
        if (!doctorSchedule) {
          continue;
        }

        if (!doctor.doctorAppointments) {
          return true;
        }

        //Now I'll get the list of appointments of the doctor this day
        const dayAppointments = doctor.doctorAppointments.filter(
          (appointment) => {
            // Extract only the date not the time
            const appointmentDate = new Date(appointment.scheduleDate)
              .toISOString()
              .split("T")[0];
            const currentDate = curDate.toISOString().split("T")[0];

            // Compare only the date parts
            return appointmentDate === currentDate;
          }
        );

        //If there are no appointments scheduled it means you can schedule one
        if (dayAppointments.length === 0) {
          return true;
        }

        //Now lets check if there is a gap of at least 30 minutes from the start of the doctors shift to the end
        //Since the Appointments are ordered by the hour of the schedule this is more straight forward
        for (let i = 0; i < dayAppointments.length; i++) {
          let appointmentDate = new Date(dayAppointments[i].scheduleDate);

          // Check the gap between the doctor's shift start and the first appointment of the day
          if (
            i === 0 &&
            getTimeInMinutes(appointmentDate) -
              getTimeInMinutes(new Date(doctorSchedule.startTime)) >
              30
          ) {
            return true;
          }
          // Check the gap between the doctor's shift end and the last appointment of the day
          if (
            i === dayAppointments.length - 1 &&
            getTimeInMinutes(new Date(doctorSchedule.endTime)) -
              getTimeInMinutes(appointmentDate) >
              30
          ) {
            return true;
          }

          //Check the distance between the two consecutive appointments
          if (
            dayAppointments[i + 1] &&
            getTimeInMinutes(new Date(dayAppointments[i + 1].scheduleDate)) -
              getTimeInMinutes(appointmentDate) >
              30
          ) {
            return true;
          }
        }
      }

      //If after all the checks it doesn't find any available space it won't include the doctor in the selection
      return false;
    });

    res.status(200).json(availableDoctors);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error returning the available doctors",
      details: error.message,
    });
  }
});

module.exports = router;
