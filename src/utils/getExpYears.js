import { experienceData } from "../data/experienceData";

// Helper function to calculate experience years, months, and days
export function getExperienceYear(
  startDt = null,
  endDt = null,
  objResult = false
) {
  const sdt = new Date(startDt); // Start date
  const currentDate = endDt !== "Present" ? new Date(endDt) : new Date(); // Current date

  let years = currentDate.getFullYear() - sdt.getFullYear();
  let months = currentDate.getMonth() - sdt.getMonth();
  let days = currentDate.getDate() - sdt.getDate();

  if (days < 0) {
    months--;
    days += new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate(); // Get the days in previous month
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  if (objResult) {
    return { years, months, days };
  }
  return `${years}Y ${months}M`;
}
export function getTotalExperince() {
  let totalYears = 0;
  let totalMonths = 0;
  let totalDays = 0;

  experienceData.forEach((exp) => {
    const { years, months, days } = getExperienceYear(
      exp.startDate,
      exp.endDate,
      true
    );
    totalYears += years;
    totalMonths += months;
    totalDays += days;
  });

  // Normalize days → months
  if (totalDays >= 30) {
    totalMonths += Math.floor(totalDays / 30);
    totalDays = totalDays % 30;
  }

  // Normalize months → years
  if (totalMonths >= 12) {
    totalYears += Math.floor(totalMonths / 12);
    totalMonths = totalMonths % 12;
  }

  return `${totalYears}Y ${totalMonths}M`;
}
