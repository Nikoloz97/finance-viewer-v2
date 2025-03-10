export function toDollarAmount(amount: number) {
  return Number(amount.toFixed(2));
}

export function toDateOnly(dateTime: string) {
  return dateTime.split("T")[0];
}
