export function unixToTime(unixTimestamp: number) {
  var s = new Date(unixTimestamp).toLocaleTimeString("en-US");
  return s;
}
export function unixToDate(unixTime: number) {
  const date = new Date(unixTime).toLocaleDateString("en-US");
  return date;
}
