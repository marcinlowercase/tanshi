import {useEffect, useRef, useState} from "react";


import sky from "./environment/assets/sky.svg";
import lake from "./environment/assets/lake.svg";

import Sabe from "./sabe/Sabe.jsx";
import Bear from "./bear/Bear.jsx";
import Turtles from "./turtles/Turtles.jsx";
import Bison from "./bison/Bison.jsx";

import Tipis from "./environment/Tipis.jsx";

import dynamicSize from "../../functions/dynamicSize.js";

import "./Container001.css";
import Wolves from "./wolves/Wolves.jsx";
import Beavers from "./beavers/Beavers.jsx";
import Eagle from "./eagle/Eagle.jsx";
import ChapterMapTopBar from "../../components/chapter_map_top_bar/ChapterMapTopBar.jsx";

function Container001() {

    // Take the ref of the lake to put down to buffalow
    const lakeRef = useRef(null);
    const [lakeTop, setLakeTop] = useState(0);
    const [lakeLeft, setLakeLeft] = useState(0);
    const [lakeWidth, setLakeWidth] = useState({});
    const [lakeHeight, setLakeHeight] = useState({});

    const [skyBottom, setSkyBottom] = useState(0);


    const [showPopup, setShowPopup] = useState(false); // State to control visibility
    const [inLessonProgress, setInLessonProgress] = useState(false);


    const updateSkyPosition = () => {

        const container = document.getElementById("chapter-map-container");
        const minViewportHeight = 480; // Minimum viewport height to consider

        const containerHeight = container ? container.getBoundingClientRect().height : minViewportHeight;

        // const viewportHeight = Math.max(window.innerHeight, minViewportHeight);
        const viewportHeight = Math.max(containerHeight, minViewportHeight);
        const newSkyBottom = viewportHeight * 0.88; // 88% from bottom
        const sky = document.getElementById("sky");
        const lake = document.getElementById("lake");
        if (sky && lake) {
            requestAnimationFrame(() => {
                // Ensure layout is updated before setting style
                setSkyBottom(newSkyBottom);
                lake.style.width = `${dynamicSize(0.7)}px`;
            });
        }
        // setLakeWidth()

    };

    const updateLakeProperties = () => {
        requestAnimationFrame(() => {
            if (lakeRef.current) {
                const lakeRect = lakeRef.current.getBoundingClientRect();

                setLakeTop(lakeRect.top);
                setLakeWidth(lakeRect.width);
                setLakeLeft(lakeRect.left);
                setLakeHeight(lakeRect.height);
            }
        })
    }


    updateLakeProperties();

    updateSkyPosition();

    // update Sky Position when resize the window
    useEffect(() => {
        updateSkyPosition();
        updateLakeProperties();

        const resizeHandler = () => {
            updateSkyPosition();
            updateLakeProperties();
        }
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    }, []);

    return (
        <div id={"chapter-map-page"}>
            {
                !inLessonProgress
                &&
                <ChapterMapTopBar/>
            }
            <div
                id={"chapter-map-container"}
                style={{}}
            >
                <img
                    draggable={false}
                    src={sky}
                    id="sky"
                    style={{
                        position: "absolute",
                        zIndex: "5",
                        bottom: `${skyBottom}px`,
                        width: "100%",
                    }}
                    alt={"sky"}
                />
                <img
                    draggable={false}
                    ref={lakeRef}
                    alt={"lake"}
                    src={lake}
                    id="lake"
                    onLoad={() => {
                        updateLakeProperties();
                        updateSkyPosition();
                    }}
                    style={{
                        position: "absolute",
                        minWidth: "600px",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: "5",
                    }}
                />
                <Sabe/>
                <Bear/>
                <Turtles lakeWidth={lakeWidth}/>
                <Bison lakeTop={lakeTop}/>
                <Wolves/>
                <Beavers
                    variables={{
                        inLessonProgress: inLessonProgress,
                        lakeHeight: lakeHeight,
                        lakeLeft: lakeLeft,
                        lakeTop: lakeTop,
                        lakeWidth: lakeWidth,
                        showPopup: showPopup,
                    }}
                    functions={{
                        setShowPopup: setShowPopup,
                        setInLessonProgress: setInLessonProgress,
                    }}
                />
                <Eagle skyBottom={skyBottom}/>

                <Tipis/>
            </div>

        </div>
    );
}

export default Container001;
