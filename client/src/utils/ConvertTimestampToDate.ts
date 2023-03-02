export const getDateFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear().toString().substr(2);
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return { year, month, day, hours, minutes };
};
