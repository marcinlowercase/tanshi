import variables from "./variables.js";

const switchLanguage = (props) => {
    // 1. Select the main screen element
    const screenElement = document.getElementById(`language-switching-screen`);
    const nextLanguage = document.getElementById(`language-switching-screen-${props.to}`);
    const currentLanguage = document.getElementById(`language-switching-screen-${props.from}`);

    // Check if elements exist
    if (!screenElement) {
        console.error('Element with ID "language-switching-screen" not found.');
        return;
    }
    if (!nextLanguage) {
        console.warn('Element with ID "language-switching-screen-english" not found.');
    }
    if (!currentLanguage) {
        console.warn('Element with ID "language-switching-screen-cree" not found.');
    }


    // Set transition duration for fade-in (2 seconds)
    screenElement.style.transition = 'opacity 1s ease-in-out';

    // Trigger fade-in
    screenElement.style.opacity = '1';

    // Enable interaction
    screenElement.style.pointerEvents = 'auto';

    setTimeout(() => {

        if (nextLanguage) {
            nextLanguage.style.backgroundColor = variables.colorMediumGreen;
            nextLanguage.style.transition = 'background-color 0.2s ease-in-out';
        }
        if (currentLanguage) {
            currentLanguage.style.backgroundColor = 'transparent';
            currentLanguage.style.transition = 'background-color 0.2s ease-in-out';
        }

        // --- Animation Step 4: Schedule Fade-out (Wait another 2 seconds) ---
        setTimeout(() => {
            screenElement.style.transition = ''; // Use CSS rule (e.g., 'opacity 0.6s ease')
            screenElement.style.opacity = '0';
            screenElement.style.pointerEvents = 'none';

            // const fadeOutDuration = 1000; // 600ms = 0.6s
            // setTimeout(() => {
            //
            //     if (nextLanguage) {
            //         nextLanguage.style.backgroundColor = '';
            //         nextLanguage.style.transition = ''; // Also clear transition
            //     }
            //     if (currentLanguage) {
            //         currentLanguage.style.backgroundColor = '';
            //         currentLanguage.style.transition = ''; // Also clear transition
            //     }
            //
            // }, fadeOutDuration);


        }, 1000);

    }, 600); // 2000ms delay before changing backgrounds (waits for fade-in)
};

export default switchLanguage;

// --- How to use ---
// Call switchLanguage() when you want the animation sequence to start.
// For example, in response to a button click or another event.