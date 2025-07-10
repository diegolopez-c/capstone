export default function formatFullDate(date) {
  let dateType = new Date(date);
  let dayInfo = dateType.toDateString();
  let hours = dateType.getUTCHours();
  let minutes = dateType.getUTCMinutes();

  return `${dayInfo} at ${hours}:${minutes < 10 ? minutes + "0" : minutes}`;
}
