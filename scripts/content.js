const colorPalettes = [
	{
		// Original Palette (Blue-Green-Yellow)
		color1: "rgba(42, 123, 155, 1)",
		color2: "rgba(87, 199, 133, 1)",
		color3: "rgba(237, 221, 83, 1)",
	},
	{
		// Minimalist: Grayscale with a hint of warm gray
		color1: "rgba(64, 64, 64, 1)", // Dark Gray (for 'Time Left' text/border)
		color2: "rgba(128, 128, 128, 1)", // Medium Gray (for 'Reading Time' text/border)
		color3: "rgba(192, 192, 192, 1)", // Light Gray (for progress bar end, or subtle highlight)
	},
	{
		// Professional & Calm: Deep Blue to Soft Teal
		color1: "rgba(23, 56, 85, 1)", // Darker Blue
		color2: "rgba(40, 100, 120, 1)", // Medium Blue-Green
		color3: "rgba(80, 150, 170, 1)", // Lighter Teal
	},
	{
		// Vibrant & Energetic: Sunset Orange to Deep Purple
		color1: "rgba(255, 120, 0, 1)", // Bright Orange
		color2: "rgba(255, 60, 60, 1)", // Red-Orange
		color3: "rgba(120, 0, 120, 1)", // Deep Purple
	},
	{
		// Earthy Tones: Forest Green to Sandy Beige
		color1: "rgba(34, 87, 49, 1)", // Dark Forest Green
		color2: "rgba(76, 142, 94, 1)", // Medium Green
		color3: "rgba(210, 180, 140, 1)", // Sandy Beige
	},
	{
		// Cool & Modern: Slate Blue to Muted Violet
		color1: "rgba(70, 80, 90, 1)", // Dark Slate
		color2: "rgba(100, 115, 130, 1)", // Medium Blue-Gray
		color3: "rgba(160, 150, 180, 1)", // Muted Violet
	},
	{
		// Warm & Inviting: Soft Peach to Rose Gold
		color1: "rgba(255, 192, 180, 1)", // Soft Peach
		color2: "rgba(255, 150, 150, 1)", // Coral Pink
		color3: "rgba(220, 120, 120, 1)", // Muted Rose
	},
];

async function init() {
	const progressBar = document.createElement("div");
	const readingTimeLabel = document.createElement("div");
	const readingTimeLeftLabel = document.createElement("div");

	const result = await chrome.storage.local.get("selectedColorIndex");
	const selectedColorIndex =
		typeof result.selectedColorIndex === "number"
			? result.selectedColorIndex
			: 0;

	console.log(selectedColorIndex);

	const { color1, color2, color3 } = colorPalettes[selectedColorIndex];

	// --- Progress Bar Styles ---
	progressBar.style.position = "fixed";
	progressBar.style.top = "0";
	progressBar.style.left = "0";
	progressBar.style.height = "5px";
	progressBar.style.width = "0%";
	// Dynamically set the background gradient using selected colors
	progressBar.style.background = `linear-gradient(90deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
	progressBar.style.zIndex = "9999";

	// --- Reading Time Label Styles ---
	readingTimeLabel.style.position = "fixed";
	readingTimeLabel.style.bottom = "40px";
	readingTimeLabel.style.right = "10px";
	readingTimeLabel.style.fontSize = "12px";
	readingTimeLabel.style.fontWeight = "600";
	// Use color2 with reduced opacity for the background
	readingTimeLabel.style.backgroundColor = color2.replace(
		/, 1\)$/,
		", 0.15)"
	);
	readingTimeLabel.style.color = color2;
	readingTimeLabel.style.padding = "6px 10px";
	readingTimeLabel.style.borderRadius = "5px";
	readingTimeLabel.style.zIndex = "9998";
	readingTimeLabel.style.fontFamily =
		" 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
	readingTimeLabel.style.backdropFilter = "blur(5px)";
	readingTimeLabel.style.webkitBackdropFilter = "blur(5px)";
	readingTimeLabel.style.border = `1px solid ${color2}`;

	// --- Reading Time Left Label Styles ---
	readingTimeLeftLabel.style.position = "fixed";
	readingTimeLeftLabel.style.bottom = "10px";
	readingTimeLeftLabel.style.right = "10px";
	readingTimeLeftLabel.style.fontSize = "12px";
	readingTimeLeftLabel.style.fontWeight = "600";
	// Use color1 with reduced opacity for the background
	readingTimeLeftLabel.style.backgroundColor = color1.replace(
		/, 1\)$/,
		", 0.15)"
	);
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

	readingTimeLabel.textContent = `Reading Time: ${fomatReadingTime(
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
}

init();
