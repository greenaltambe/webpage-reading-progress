const progressBar = document.createElement("div");
const readingTimeLabel = document.createElement("div");
const readingTimeLeftLabel = document.createElement("div");

// Style the progress bar
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "5px";
progressBar.style.width = "0%";
progressBar.style.backgroundColor = "blue";
progressBar.style.zIndex = "9999";

// Style the reading time label
readingTimeLabel.style.position = "fixed";
readingTimeLabel.style.bottom = "40px";
readingTimeLabel.style.top = "";
readingTimeLabel.style.opacity = "0.7";
readingTimeLabel.style.right = "10px";
readingTimeLabel.style.fontSize = "12px";
readingTimeLabel.style.fontWeight = "bold";
readingTimeLabel.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
readingTimeLabel.style.color = "white";
readingTimeLabel.style.padding = "5px";
readingTimeLabel.style.borderRadius = "5px";
readingTimeLabel.style.zIndex = "9999";

// Style the reading time left label
readingTimeLeftLabel.style.position = "fixed";
readingTimeLeftLabel.style.bottom = "10px";
readingTimeLeftLabel.style.top = "";
readingTimeLeftLabel.style.opacity = "0.7";
readingTimeLeftLabel.style.right = "10px";
readingTimeLeftLabel.style.fontSize = "12px";
readingTimeLeftLabel.style.fontWeight = "bold";
readingTimeLeftLabel.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
readingTimeLeftLabel.style.color = "white";
readingTimeLeftLabel.style.padding = "5px";
readingTimeLeftLabel.style.borderRadius = "5px";
readingTimeLeftLabel.style.zIndex = "9999";

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

readingTimeLabel.textContent = `Estimated Reading Time: ${fomatReadingTime(
	readingTime
)}`;

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
