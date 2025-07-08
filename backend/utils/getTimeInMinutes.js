function getTimeInMinutes(date) {
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}

module.exports = getTimeInMinutes;
