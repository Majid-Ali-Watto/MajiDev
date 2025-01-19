export default function toLocalDate(date) {
	if (!date) return "";
	if (date == "Present") return date;
	return new Date(date).toDateString();
}
