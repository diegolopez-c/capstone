const checkExistentGap = require("./checkExistentGap");

//You pass a date and the doctor to verify if he is available that date
function checkDayAvailability(date, doctor) {
  const { doctorAppointments, doctorAvailability } = doctor;

  //Find the appointments of that date
  const dayAppointments = doctorAppointments.filter((app) => {
    const appDate = new Date(app.scheduleDate).toISOString().split("T")[0];
    const checkDate = date.toISOString().split("T")[0];
    return appDate === checkDate;
  });

  //Finds the doctor Schedule that date
  const dayAvailability = doctorAvailability.find(
    (a) => a.dayOfWeek === date.getUTCDay()
  );

  //If theres no day availability it returns false since the doctor doesn't works that day
  if (!dayAvailability || dayAvailability.length === 0) {
    return false;
    //If there are no appointments it returns true since the doctor schedule for that day is totaly free
  } else if (!dayAppointments || dayAppointments.length === 0) {
    return true;
  }

  //Check for a gap since the start of the doctor's shift to the end
  return checkExistentGap(dayAppointments, dayAvailability);
}

module.exports = checkDayAvailability;
