function concatHoursInMinutesToDates(minutes, date) {
  let h = Math.floor(minutes / 60);
  let m = minutes - h * 60;

  const newDate = new Date(date.getTime());
  newDate.setUTCHours(h, m, 0, 0);

  return newDate;
}

module.exports = concatHoursInMinutesToDates;
