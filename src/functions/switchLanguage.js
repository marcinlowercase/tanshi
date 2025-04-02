import variables from "./variables.js";

const switchLanguage = () => {
    // 1. Select the main screen element
    const screenElement = document.getElementById('language-switching-screen');
    const englishElement = document.getElementById('language-switching-screen-english');
    const creeElement = document.getElementById('language-switching-screen-cree');

    // Check if elements exist
    if (!screenElement) {
        console.error('Element with ID "language-switching-screen" not found.');
        return;
    }
    if (!englishElement) {
        console.warn('Element with ID "language-switching-screen-english" not found.');
    }
    if (!creeElement) {
        console.warn('Element with ID "language-switching-screen-cree" not found.');
    }


    // Set transition duration for fade-in (2 seconds)
    screenElement.style.transition = 'opacity 1s ease-in-out';

    // Trigger fade-in
    screenElement.style.opacity = '1';

    // Enable interaction
    screenElement.style.pointerEvents = 'auto';

    setTimeout(() => {

        if (englishElement) {
            englishElement.style.backgroundColor = variables.colorMediumGreen;
            englishElement.style.transition = 'background-color 0.1s ease-in-out';
        }
        if (creeElement) {
            creeElement.style.backgroundColor = 'transparent';
            creeElement.style.transition = 'background-color 0.1s ease-in-out';
        }

        // --- Animation Step 4: Schedule Fade-out (Wait another 2 seconds) ---
        setTimeout(() => {
            screenElement.style.transition = ''; // Use CSS rule (e.g., 'opacity 0.6s ease')
            screenElement.style.opacity = '0';
            screenElement.style.pointerEvents = 'none';

            const fadeOutDuration = 1000; // 600ms = 0.6s
            setTimeout(() => {

                if (englishElement) {
                    englishElement.style.backgroundColor = '';
                    englishElement.style.transition = ''; // Also clear transition
                }
                if (creeElement) {
                    creeElement.style.backgroundColor = '';
                    creeElement.style.transition = ''; // Also clear transition
                }

            }, fadeOutDuration);


        }, 1000);

    }, 1000); // 2000ms delay before changing backgrounds (waits for fade-in)
};

export default switchLanguage;

// --- How to use ---
// Call switchLanguage() when you want the animation sequence to start.
// For example, in response to a button click or another event.