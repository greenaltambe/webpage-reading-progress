# webpage-reading-progress

A browser extension script that displays a reading progress bar and estimated reading time for any webpage. It helps users track how much of the page they've read and how much time is left to finish reading.

## Features

-   **Progress Bar:** Shows your scroll progress at the top of the page.
-   **Estimated Reading Time:** Displays the total estimated time to read the page.
-   **Time Left:** Updates dynamically as you scroll, showing how much reading time remains.

## How It Works

-   The script calculates the total word count of the page and estimates reading time based on an average reading speed (200 words per minute).
-   As you scroll, the progress bar fills and the "Time Left" label updates.

## Usage

1. Copy the contents of `scripts/content.js` into your browser's console or inject it as a content script in your browser extension.
2. The progress bar and reading time labels will appear automatically.
