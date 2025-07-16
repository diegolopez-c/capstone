export default function formatFullDate(date) {
  const dateObj = new Date(date);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = weekdays[dateObj.getUTCDay()];

  const day = dateObj.getUTCDate();
  const month = dateObj.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const year = dateObj.getUTCFullYear();
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");

  return `${dayName}, ${month} ${day}, ${year} at ${hours}:${minutes} UTC`;
}
