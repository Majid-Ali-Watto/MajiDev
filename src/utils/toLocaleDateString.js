import parseDate from "./parseDate";

export default function toLocalDate(date) {
	if (!date) return "";
	if (date == "Present") return date;
	return parseDate(date).toDateString();
}
