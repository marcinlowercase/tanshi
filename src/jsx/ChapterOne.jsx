import sky from "../assets/sky.svg";
import lake from "../assets/lake.svg";

import Sabe from "./Sabe.jsx";
import Bear from "./Bear.jsx";
import Turtles from "./Turtles.jsx";
import Buffalo from "./Buffalo.jsx";

import dynamicSize from "../functions/dynamicSize.js";

import "../css/ChapterOne.css";
import {useEffect, useRef, useState} from "react";
import Wolves from "./Wolves.jsx";

function ChapterOne() {

    // Take the ref of the lake to put down to buffalow
    const lakeRef = useRef(null);
    const [lakeTop, setLakeTop] = useState(0);
    const [lakeLeft, setLakeLeft] = useState(0);
    const [lakeWidth, setLakeWidth] = useState({});

    const updateSkyPosition = () => {
        const minViewportHeight = 480; // Minimum viewport height to consider
        const viewportHeight = Math.max(window.innerHeight, minViewportHeight);
        const skyBottom = viewportHeight * 0.88; // 88% from bottom
        const sky = document.getElementById("sky");
        const lake = document.getElementById("lake");
        if (sky && lake) {
            requestAnimationFrame(() => {
                // Ensure layout is updated before setting style
                sky.style.bottom = `${skyBottom}px`;
                lake.style.width = `${dynamicSize(0.7)}px`;
                // lake.style.width = `${0.7 * window.innerWidth}px`;
            });
        }
        // setLakeWidth()

    };

    const updateLakeTop = () => {
        requestAnimationFrame(() => {
            if (lakeRef.current) {
                const lakeRect = lakeRef.current.getBoundingClientRect();

                setLakeTop(lakeRect.top);
                setLakeWidth(lakeRect.width);
                setLakeLeft(lakeRect.left);
            }
        })
    }


    updateLakeTop();

    updateSkyPosition();

    // update Sky Position when resize the window
    useEffect(() => {
        updateSkyPosition();
        updateLakeTop();

        const resizeHandler = () => {
            updateSkyPosition();
            updateLakeTop();
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
            <img
                ref={lakeRef}
                alt={"lake"}
                src={lake}
                id="lake"
                style={{
                    position: "absolute",
                    minWidth: "300px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "5",
                }}
            />
            <Sabe/>
            <Bear/>
            <Turtles lakeWidth = {lakeWidth} />
            <Buffalo lakeTop={lakeTop}/>
            <Wolves/>
        </div>
    );
}

export default ChapterOne;
