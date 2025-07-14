const getTimeInMinutes = require("./getTimeInMinutes");

//The function needs the doctorAvailability object and the doctors appointments of that day
function calculateGapsAvailable(doctorAvailability, doctorAppointments) {
  let availableHours = [];

  let curHour = getTimeInMinutes(new Date(doctorAvailability.startTime));
  let shiftEnd = getTimeInMinutes(new Date(doctorAvailability.endTime));

  while (curHour < shiftEnd - 30) {
    //If theres not an appointment in the 30 min +- from the current hour
    const overlapAppointments = doctorAppointments.find((app) => {
      return (
        Math.abs(curHour - getTimeInMinutes(new Date(app.scheduleDate))) < 30
      );
    });

    if (overlapAppointments === undefined) {
      availableHours.push(curHour);
    }

    curHour += 30;
  }

  return availableHours;
}

module.exports = calculateGapsAvailable;
