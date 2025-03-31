const playAudio = (params) => {
    if (Array.isArray(params.audioArray)) {
        params.audioArray.forEach((audio) => {
            if (audio && audio.current) {
                audio.current.currentTime = 0;
                audio.current.volume = params.volume !== undefined ? params.volume : 1.0; // Default to full volume

                audio.current.play().catch((err) => {
                    console.error("Playback failed: ", err);
                });

                // Add loop functionality
                audio.current.addEventListener('ended', () => {
                    if (params.loop) {
                        audio.current.currentTime = 0;
                        audio.current.play().catch((err) => {
                            console.error("Loop playback failed: ", err);
                        });
                    } else {
                        if (params.nextAudio) {
                            console.log('nextAudio');
                            playAudio({
                                audioArray: params.nextAudio,
                                loop: false,
                                callbackFunction: params.callbackFunction
                            });
                        } else {
                            console.log(typeof (params.callbackFunction))
                            params.callbackFunction();
                        }
                    }
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
const loadAudio = (audioArray) => {
    if (Array.isArray(audioArray)) {
        audioArray.forEach((audio) => {
            if (audio.audio && audio.audio.current) {
                audio.audio.current = new Audio(audio.audioURL);
                audio.audio.current.load();
            }
        })
    } else {
        console.error("loadAudio: Input is not an array.");
    }
}

export {playAudio, stopAudio, loadAudio};