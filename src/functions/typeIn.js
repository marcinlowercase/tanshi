const typeIn = (text, targetDivId, speed = 200,callback ) => {
    /**
     * Simulates a type-in animation within a specified div and plays a typing sound.
     *
     * @param {string} text The text to be displayed.
     * @param {string} targetDivId The ID of the div element where the text will be displayed.
     * @param {number} [speed=100] The delay (in milliseconds) between displaying each character.
     * @param {string} [soundUrl] The URL of the keyboard typing sound audio file.
     */
    const targetDiv = document.getElementById(targetDivId);
    let audio;

    const soundUrl = new URL('./assets/audio/click1.m4a', import.meta.url).href;
    if (soundUrl) {
        audio = new Audio(soundUrl);
        audio.loop = false; // Play sound for each character
    }

    if (!targetDiv) {
        console.error(`Div with ID '${targetDivId}' not found.`);
        return;
    }

    let index = 0;

    const typeCharacter = () => {
        if (index < text.length) {
            targetDiv.innerText += text[index];
            if (audio) {
                // Reset the audio playback to the beginning for each character
                audio.currentTime = 0;
                audio.play();
            }
            index++;
            setTimeout(typeCharacter, speed);
        }
    };

    // Clear any existing text in the div before starting the animation
    targetDiv.innerText = "";
    typeCharacter();
    callback();

};

export default typeIn;
