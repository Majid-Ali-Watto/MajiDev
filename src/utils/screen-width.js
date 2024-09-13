function getScreenWidth() {
	let width = window.innerWidth;
	if (width > 768) {
		width = width / 3;
	} else if (width > 500) {
		width = 400;
	} else if (width < 500) {
		width = width - 20;
	} else if (width < 400) {
		width = width - 40;
	}
	return width;
}
export default getScreenWidth;
