export function unixToMonth(unixTime: number) {
  const date = new Date(unixTime);
  const month = date.getMonth();

  enum months {
    JAN = 0,
    FEB = 1,
    MAR = 2,
    APR = 3,
    MAY = 4,
    JUN = 5,
    JUL = 6,
    AUG = 7,
    SEP = 8,
    OCT = 9,
    NOV = 10,
    DEC = 11,
  }

  return months[month];
}

export function unixToDateNumber(unixTime: number) {
  const fullDate = new Date(unixTime);
  const day = fullDate.getDate();
  return day;
}
