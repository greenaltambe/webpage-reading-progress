import colorPalettes from "./colorPalette.js";
const colorList = document.getElementById("color-list");

function addColorToList(selectedIndex = 0) {
	colorPalettes.forEach((palette, index) => {
		const colorItem = document.createElement("li");
		const colorBox = document.createElement("div");
		const color1 = document.createElement("div");
		const color2 = document.createElement("div");
		const color3 = document.createElement("div");

		colorBox.classList.add("color-container");
		color1.classList.add("color1");
		color2.classList.add("color2");
		color3.classList.add("color3");
		color1.classList.add("color");
		color2.classList.add("color");
		color3.classList.add("color");

		color1.style.backgroundColor = palette.color1;
		color2.style.backgroundColor = palette.color2;
		color3.style.backgroundColor = palette.color3;

		colorBox.appendChild(color1);
		colorBox.appendChild(color2);
		colorBox.appendChild(color3);
		colorItem.appendChild(colorBox);

		if (index === selectedIndex) {
			colorItem.classList.add("selected");
		}

		colorItem.addEventListener("click", () => {
			const prevSelected = colorList.querySelector(".selected");
			if (prevSelected) {
				prevSelected.classList.remove("selected");
			}

			colorItem.classList.add("selected");
			chrome.storage.local.set({ selectedColorIndex: index });
		});

		colorList.appendChild(colorItem);
	});
}

chrome.storage.local.get("selectedColorIndex", (result) => {
	addColorToList(result.selectedColorIndex);
});
