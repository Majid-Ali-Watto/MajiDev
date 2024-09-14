// Helper function to calculate experience years, months, and days
export function getExperienceYear() {
	const sdt = new Date(import.meta.env.VITE_JOINING_DATE); // Start date
	const currentDate = new Date(); // Current date

	let years = currentDate.getFullYear() - sdt.getFullYear();
	let months = currentDate.getMonth() - sdt.getMonth();
	let days = currentDate.getDate() - sdt.getDate();

	if (days < 0) {
		months--;
		days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // Get the days in previous month
	}
	if (months < 0) {
		years--;
		months += 12;
	}

	return `${years}Y ${months}M ${days}D`;
}
