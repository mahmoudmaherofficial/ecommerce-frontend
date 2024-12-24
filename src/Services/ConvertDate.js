export default function ConvertDate(date) {
  const selectedDate = new Date(date);
  const day = selectedDate.getDate();
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();
  return `${day}/${month}/${year}`;
}
