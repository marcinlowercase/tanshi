const playAudio = (audioArray) => {
    if (Array.isArray(audioArray)) {
        audioArray.forEach((audio) => {
            if (audio && audio.current) {
                audio.current.currentTime = 0;
                audio.current.play().catch((err) => {
                    console.error("Playback failed: ", err);
                });

                // Add loop functionality
                audio.current.addEventListener('ended', () => {
                    audio.current.currentTime = 0;
                    audio.current.play().catch((err) => {
                        console.error("Loop playback failed: ", err);
                    });
                });
            }
        });
    } else {
        console.error("playAudio: Input is not an array.");
    }
};

const stopAudio = (audioArray) => {
    if (Array.isArray(audioArray)) {
        audioArray.forEach((audio) => {
            if (audio && audio.current) {
                audio.current.pause();
                audio.current.currentTime = 0;
                // Remove the event listener to avoid memory leaks
                audio.current.removeEventListener('ended', () => {
                    audio.current.currentTime = 0;
                    audio.current.play();
                });
            }
        });
    } else {
        console.error("stopAudio: Input is not an array.");
    }
};

export { playAudio, stopAudio };