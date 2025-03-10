const playAudio = (audio) => {
    if (audio.current) {
        console.log("playAudio", audio.current);
        audio.current.currentTime = 0;
        audio.current.play().catch((err) => {
            console.error("Playback failed: ", err);
        });
    }
}

export default playAudio;