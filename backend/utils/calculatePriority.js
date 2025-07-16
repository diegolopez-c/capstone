// Function to calculate the level of priority of an appointment given the time scheduled for the appointment
// Less than an hour: Level 1 priority
// Less than 3 hours: level 2 priority
// Less than 8 hours: level 3 priority
// Less than 24 hours: level 4 priority
// Else: level 5 priority

function calculatePriority(scheduleTime) {
  //How far is from now in minutes
  const difference = (new Date(scheduleTime) - new Date()) / 60000;
  if (difference < 60) return 1;
  if (difference < 180) return 2;
  if (difference < 480) return 3;
  if (difference < 1440) return 4;
  return 5;
}

module.exports = calculatePriority;
