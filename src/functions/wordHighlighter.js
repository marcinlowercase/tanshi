// wordHighlighter.js

export function startWordHighlighter(containerElement, words) {
    let animationFrameId;
    let startTime = null;
    let activeIndex = -1;

    const updateHighlight = (timestamp) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const currentIndex = words.findIndex((word, idx) => {
            const next = words[idx + 1];
            return elapsed >= word.timestamp && (!next || elapsed < next.timestamp);
        });

        if (currentIndex !== activeIndex) {
            // Remove previous highlight
            if (activeIndex !== -1) {
                const prev = containerElement.querySelector(`span[data-timestamp="${words[activeIndex].timestamp}"]`);
                if (prev) prev.classList.remove("current");
            }

            // Add new highlight
            if (currentIndex !== -1) {
                const current = containerElement.querySelector(`span[data-timestamp="${words[currentIndex].timestamp}"]`);
                if (current) current.classList.add("current");
            }

            activeIndex = currentIndex;
        }

        animationFrameId = requestAnimationFrame(updateHighlight);
    };

    const stop = () => {
        cancelAnimationFrame(animationFrameId);
        if (activeIndex !== -1) {
            const current = containerElement.querySelector(`span[data-timestamp="${words[activeIndex].timestamp}"]`);
            if (current) current.classList.remove("current");
        }
        activeIndex = -1;
        startTime = null;
    };

    animationFrameId = requestAnimationFrame(updateHighlight);

    return { stop };
}
