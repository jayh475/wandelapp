export function unixToTime(unixTimestamp: number) {
  return new Date(unixTimestamp).toLocaleTimeString("en-US");
}
export function unixToDate(unixTime: number) {
  return new Date(unixTime).toLocaleDateString("en-US");
}
