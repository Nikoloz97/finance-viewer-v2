import { Decimal128 } from "mongodb";

export function toDollarAmount(amount: number) {
  const formattedValue = amount.toFixed(2);
  return Decimal128.fromString(formattedValue);
}

export function toDateOnly(dateTime: string) {
  return dateTime.split("T")[0];
}
