import { Decimal128 } from "mongodb";

export function toDollarAmount(param: string) {
  const formattedValue = Number(param).toFixed(2);
  return Decimal128.fromString(formattedValue);
}

export function toDateOnly(dateTime: string) {
  return dateTime.split("T")[0];
}
