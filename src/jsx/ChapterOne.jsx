import sky from "../assets/sky.svg";

import Sabe from "./Sabe.jsx";

import "../css/ChapterOne.css";
import Bear from "./Bear.jsx";
import {useEffect} from "react";

function ChapterOne() {
    // skyRef to get sky height
    const updateSkyPosition = () => {
        const minViewportHeight = 480; // Minimum viewport height to consider
        const viewportHeight = Math.max(window.innerHeight, minViewportHeight);
        const skyBottom = viewportHeight * 0.88; // 88% from bottom
        const skyElement = document.getElementById("sky");
        if (skyElement) {
            requestAnimationFrame(() => {
                // Ensure layout is updated before setting style
                skyElement.style.bottom = `${skyBottom}px`;
            });
        }
    };

    updateSkyPosition();

    // update Sky Position when resize the window
    useEffect(() => {
        updateSkyPosition();
        const resizeHandler = () => {
            updateSkyPosition();
        }
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    }, []);

    return (
        <div>
            <img
                src={sky}
                id="sky"
                style={{
                    position: "absolute",
                    zIndex: "5",
                    bottom: "88vh",
                    width: "100%",
                }}
                alt={"sky"}
            />
            <Sabe
            />
            <Bear
            />
        </div>
    );
}

export default ChapterOne;
