export function getUnixOfToday() {
  let today = new Date();
  let unix: number = Math.round(today.getTime());
  return unix;
}

// https://stackoverflow.com/questions/11893083/convert-normal-date-to-unix-timestamp
