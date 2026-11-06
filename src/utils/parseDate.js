// A content date ("2022-10-24") as that calendar day in the visitor's time zone. `new Date("2022-10-24")` is midnight UTC,
// which is still the day before anywhere west of UTC, so durations would drift from the backend's date-only maths
// (majidev-backend backend/services/experience.py). Any other format is left to the Date parser.
export default function parseDate(value) {
  const day = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? "");
  return day ? new Date(Number(day[1]), Number(day[2]) - 1, Number(day[3])) : new Date(value);
}
