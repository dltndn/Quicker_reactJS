export const getDateFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear().toString().substr(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return { year, month, day, hours, minutes };
};

export const formatedDate = (data: any): string => {
  const year = data.year;
  const month = data.month;
  const day = data.day;
  const hours = data.hours;
  const min = data.minutes;
  return `${year}.${month}.${day} ${hours}:${min}`;
};