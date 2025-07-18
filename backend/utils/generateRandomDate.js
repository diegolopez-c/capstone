function generateRandomDate(startDate, endDate) {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  const randomTimestamp =
    startTimestamp + Math.random() * (endTimestamp - startTimestamp);

  return new Date(randomTimestamp);
}

module.exports = generateRandomDate;
