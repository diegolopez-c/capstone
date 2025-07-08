const getTimeInMinutes = require("./getTimeInMinutes");

function checkExistentGap(appointmentList, doctorSchedule) {
  //Now lets check if there is a gap of at least 30 minutes from the start of the doctors shift to the end
  //Since the Appointments are ordered by the hour of the schedule this is more straight forward
  for (let i = 0; i < appointmentList.length; i++) {
    let appointmentDate = new Date(appointmentList[i].scheduleDate);

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
      i === appointmentList.length - 1 &&
      getTimeInMinutes(new Date(doctorSchedule.endTime)) -
        getTimeInMinutes(appointmentDate) >
        30
    ) {
      return true;
    }

    //Check the distance between the two consecutive appointments
    if (
      appointmentList[i + 1] &&
      getTimeInMinutes(new Date(appointmentList[i + 1].scheduleDate)) -
        getTimeInMinutes(appointmentDate) >
        30
    ) {
      return true;
    }
  }

  return false;
}

module.exports = checkExistentGap;
