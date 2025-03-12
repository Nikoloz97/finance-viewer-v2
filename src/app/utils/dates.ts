import { months } from "./months";

export const getMonthIndex = (dateInput: Date) => {
  const month = dateInput.getMonth(); // note: months are 0-indexed (0 = jan, 11 = dec)
  const day = dateInput.getDate();

  const startBound = 25;
  const endBound = 5;

  if (day >= startBound) {
    return month;
  } else if (day <= endBound) {
    return month === 0 ? 11 : month - 1; // if jan, go to december
  } else {
    throw new Error("Date input is outside the valid bounds");
  }
};

export const getMonthsArray = (
  latestMonthIndex: number,
  totalMonths: number
) => {
  if (latestMonthIndex > 11 || totalMonths < 1 || totalMonths > 12) {
    throw Error(
      "Invalid parameters: latestMonthIndex must be 0-11 and totalMonths must be 1-12"
    );
  }

  const monthsArray = [];

  const startMonthIndex = latestMonthIndex - (totalMonths - 1);

  for (let i = 0; i < totalMonths; i++) {
    const monthIndex = (startMonthIndex + i + 12) % 12; // e.g. 11 % 12 = 11 and 12 % 12 = 0
    monthsArray.push({ month: months[monthIndex] });
  }

  return monthsArray;
};

export const getCutOffDate = (cutOffDate: Date, monthModifier: number) => {
  const month = cutOffDate.getMonth(); // note: months are 0-indexed (0 = jan, 11 = dec)
  const day = cutOffDate.getDate();

  if (day > 5 && day < 25) {
    throw new Error("Date input is outside the valid bounds");
  }

  if (day <= 5) {
    cutOffDate.setMonth(month - 1);
  }

  cutOffDate.setDate(25);
  cutOffDate.setMonth(month + monthModifier);

  return cutOffDate;
};
