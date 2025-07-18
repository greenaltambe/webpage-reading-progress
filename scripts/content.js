const progressBar = document.createElement("div");
const readingTimeLabel = document.createElement("div");
const readingTimeLeftLabel = document.createElement("div");

const color1 = "rgba(42, 123, 155, 1)";
const color2 = "rgba(87, 199, 133, 1)";
const color3 = "rgba(237, 221, 83, 1)";

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "5px";
progressBar.style.width = "0%";
progressBar.style.background =
	"linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)";
progressBar.style.zIndex = "9999";

readingTimeLabel.style.position = "fixed";
readingTimeLabel.style.bottom = "40px";
readingTimeLabel.style.right = "10px";
readingTimeLabel.style.fontSize = "12px";
readingTimeLabel.style.fontWeight = "600";
readingTimeLabel.style.backgroundColor = "rgba(87, 199, 133, 0.15)";
readingTimeLabel.style.color = color2;
readingTimeLabel.style.padding = "6px 10px";
readingTimeLabel.style.borderRadius = "5px";
readingTimeLabel.style.zIndex = "9998";
readingTimeLabel.style.fontFamily =
	" 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
readingTimeLabel.style.backdropFilter = "blur(5px)";
readingTimeLabel.style.webkitBackdropFilter = "blur(5px)";
readingTimeLabel.style.border = `1px solid ${color2}`;

readingTimeLeftLabel.style.position = "fixed";
readingTimeLeftLabel.style.bottom = "10px";
readingTimeLeftLabel.style.right = "10px";
readingTimeLeftLabel.style.fontSize = "12px";
readingTimeLeftLabel.style.fontWeight = "600";
readingTimeLeftLabel.style.backgroundColor = "rgba(42, 123, 155, 0.15)";
readingTimeLeftLabel.style.color = color1;
readingTimeLeftLabel.style.padding = "6px 10px";
readingTimeLeftLabel.style.borderRadius = "5px";
readingTimeLeftLabel.style.zIndex = "9998";
readingTimeLeftLabel.style.fontFamily =
	" 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
readingTimeLeftLabel.style.backdropFilter = "blur(5px)";
readingTimeLeftLabel.style.webkitBackdropFilter = "blur(5px)";
readingTimeLeftLabel.style.border = `1px solid ${color1}`;

// Append the progress bar and reading time label to the document body
document.body.appendChild(progressBar);
document.body.appendChild(readingTimeLabel);
document.body.appendChild(readingTimeLeftLabel);

// Update the progress bar
function updateProgressBar() {
	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	const scrollHeight =
		document.documentElement.scrollHeight - window.innerHeight;
	const scrollPercentage = (scrollTop / scrollHeight) * 100;

	progressBar.style.width = `${scrollPercentage}%`;
}

function fomatReadingTime(readingTime) {
	const hours = Math.floor(readingTime / 60);
	const minutes = readingTime % 60;
	if (hours > 0) {
		return `${hours} hours ${minutes} minutes`;
	} else {
		if (minutes === 1) {
			return `${minutes} minute`;
		} else {
			return `${minutes} minutes`;
		}
	}
}

// Calculate the estimated reading time and time left
function estimateReadingTime() {
	const text = document.body.innerText || "";
	const wordCount = text.trim().split(/\s+/).length;
	const wordPerMinute = 200;
	const readingTime = Math.ceil(wordCount / wordPerMinute);
	return readingTime;
}

// Calculate the time left
function calculateTimeLeft(readingTime) {
	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	const scrollHeight =
		document.documentElement.scrollHeight - window.innerHeight;
	const scrollPercentage = (scrollTop / scrollHeight) * 100;
	const remainingPercentage = 100 - scrollPercentage;

	const remainingTime = (remainingPercentage / 100) * readingTime;
	return Math.ceil(remainingTime);
}

const readingTime = estimateReadingTime();

readingTimeLabel.textContent = `Reading Time: ${fomatReadingTime(readingTime)}`;

function updateReadingTimeLeft() {
	readingTimeLeftLabel.textContent = `Time Left: ${fomatReadingTime(
		calculateTimeLeft(readingTime)
	)}`;
}

window.addEventListener("scroll", () => {
	updateProgressBar();
	updateReadingTimeLeft();
});

updateProgressBar();
updateReadingTimeLeft();
