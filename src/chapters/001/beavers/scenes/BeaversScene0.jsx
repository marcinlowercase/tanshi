import sand from "../assets/img/sand.svg";
import rock1 from "../assets/img/beaver-rock1.svg";
import rock2 from "../assets/img/beaver-rock2.svg";
import rock3 from "../assets/img/beaver-rock3.svg";
import {zoomOut} from "../../../../functions/zoom.js";
import {useEffect, useRef, useState} from "react";
import {startAnimationInterval, stopAnimationInterval} from "../../../../functions/animationInternal.js";
import log1 from "../assets/img/beaver_log/beaver-log1.svg";
import log2 from "../assets/img/beaver_log/beaver-log2.svg";
import log3 from "../assets/img/beaver_log/beaver-log3.svg";

import beaver1 from '../assets/img/beaver/beaver1.svg'
import beaver2 from '../assets/img/beaver/beaver2.svg'
import beaver3 from '../assets/img/beaver/beaver3.svg'
import beaver4 from '../assets/img/beaver/beaver4.svg'


import "./beaver-scene0.css"

const beaverEatingSoundURL = new URL("../assets/audio/eating-beaver.mp3", import.meta.url).href;
const lakeBackgroundSoundURL = new URL("../assets/audio/lake-background.mp3", import.meta.url).href;
const windBackgroundSoundURL = new URL("../assets/audio/wind-background.mp3", import.meta.url).href;

const beaverEatingAnimationArr = [beaver1, beaver2, beaver3, beaver4];


const logAnimationArr = [log1, log2, log3];


import {playAudio, stopAudio} from "../../../../functions/audioUtilities.js";
import dynamicSize from "../../../../functions/dynamicSize.js";
import showTransitionScreen from "../../../../functions/showTransitionScreen.js";


const BeaversScene0 = (props) => {

    const [logSrc, setLogSrc] = useState(logAnimationArr[0]);
    const [logIntervalId, setLogIntervalId] = useState(null);

    const [beaverWidth, setBeaverWidth] = useState(0)


    const sandRef = useRef(null);  // Create a ref for the sand image
    const [sandBottom, setSandBottom] = useState(0);
    const [sandHeight, setSandHeight] = useState(0);

    const updateSandDimensions = () => {
        const sandElement = sandRef.current; // Get the DOM node

        if (sandElement) {
            const checkDimensions = () => {
                const rect = sandElement.getBoundingClientRect();
                if (rect.height > 0 && rect.width > 0) {
                    setSandBottom(rect.bottom);
                    console.log("SAND BOT" , sandBottom)
                    setSandHeight(rect.height);
                } else {
                    // Try again shortly if dimensions are zero
                    setTimeout(checkDimensions, 50); // Try again after 50ms
                }
            }
            checkDimensions();
        }
    }


    useEffect(() => {
        if (props.variables.showPopup) {
            updateSandDimensions();
            window.addEventListener('resize', updateSandDimensions);

            // Clean up the event listener when the component unmounts or props.variables.showPopup changes to false
            return () => {
                window.removeEventListener('resize', updateSandDimensions);
            };
        }
    }, [props.variables.showPopup, props.variables.inLessonProgress]);

    const handleBeaversProperties = () => {
        requestAnimationFrame(() => {

            setBeaverWidth(dynamicSize(0.08))


        })
    }
    handleBeaversProperties();


    const [beaver1EatingSrc, setBeaver1EatingSrc] = useState(beaverEatingAnimationArr[0]);
    const [beaver2EatingSrc, setBeaver2EatingSrc] = useState(beaverEatingAnimationArr[0]);
    const [beaver1EatingIntervalId, setBeaver1EatingIntervalId] = useState(null);
    const [beaver2EatingIntervalId, setBeaver2EatingIntervalId] = useState(null);


    useEffect(() => {
        // console.log("THIS IS CURRENT INTERVAL ID 111", beaver1EatingIntervalId );
        // console.log("THIS IS CURRENT INTERVAL ID 222", beaver2EatingIntervalId );
    })

    // setup sound effect
    const beaverEatingSound = useRef(new Audio((beaverEatingSoundURL)));
    const lakeBackgroundSound = useRef(new Audio(lakeBackgroundSoundURL));
    const windBackgroundSound = useRef(new Audio(windBackgroundSoundURL));
    useEffect(() => {
        beaverEatingSound.current = new Audio(beaverEatingSoundURL);
        beaverEatingSound.current.load();
        lakeBackgroundSound.current = new Audio(lakeBackgroundSoundURL);
        lakeBackgroundSound.current.load();
        windBackgroundSound.current = new Audio(windBackgroundSoundURL);
        windBackgroundSound.current.load();
    }, []);

    const handleMouseEnterOnBeaver1Eating = () => {
        if (!props.variables.inLessonProgress) {
            startAnimationInterval(beaver1EatingIntervalId, setBeaver1EatingIntervalId, beaver1EatingSrc, setBeaver1EatingSrc, beaverEatingAnimationArr, 200);
            if (props.variables.showPopup) playAudio([beaverEatingSound]);
        }
    }


    const handleMouseLeaveOnBeaver1Eating = () => {
        if (!props.variables.inLessonProgress) {
            stopAnimationInterval(beaver1EatingIntervalId, setBeaver1EatingIntervalId, setBeaver1EatingSrc, beaverEatingAnimationArr);
            stopAudio([beaverEatingSound]);
        }
    }

    const handleMouseEnterOnBeaver2Eating = () => {
        if (!props.variables.inLessonProgress) {
            startAnimationInterval(beaver2EatingIntervalId, setBeaver2EatingIntervalId, beaver2EatingSrc, setBeaver2EatingSrc, beaverEatingAnimationArr, 200);
            if (props.variables.showPopup) playAudio([beaverEatingSound]);
        }

    }

    const handleMouseLeaveOnBeaver2Eating = () => {
        if (!props.variables.inLessonProgress) {
            stopAnimationInterval(beaver2EatingIntervalId, setBeaver2EatingIntervalId, setBeaver2EatingSrc, beaverEatingAnimationArr);
            stopAudio([beaverEatingSound])
        }
    }

    useEffect(() => {
        // NEED TO CALL when showPopup turn true
        if (props.variables.showPopup) startAnimationInterval(logIntervalId, setLogIntervalId, logSrc, setLogSrc, logAnimationArr, 200)
        else stopAnimationInterval(logIntervalId, setLogIntervalId, setLogSrc, logAnimationArr)
    }, [props.variables.showPopup])

    useEffect(() => {

        console.log(props.variables.inLessonProgress);
        if (props.variables.inLessonProgress) {
            stopAudio([props.variables.beaverEatingSound]);
            // stop animations first then start it again
            stopAnimationInterval(beaver1EatingIntervalId, setBeaver1EatingIntervalId, setBeaver1EatingSrc, beaverEatingAnimationArr);
            stopAnimationInterval(beaver2EatingIntervalId, setBeaver2EatingIntervalId, setBeaver2EatingSrc, beaverEatingAnimationArr);

            console.log("CUrRENT 1 ", beaver1EatingIntervalId)
            console.log("CUrRENT 2 ", beaver2EatingIntervalId)
            console.log('just stop then now start a gain');
            // props.functions.startBeaversEatingAnimation();
            startAnimationInterval(beaver1EatingIntervalId, setBeaver1EatingIntervalId, beaver1EatingSrc, setBeaver1EatingSrc, beaverEatingAnimationArr, 250);
            startAnimationInterval(beaver2EatingIntervalId, setBeaver2EatingIntervalId, beaver2EatingSrc, setBeaver2EatingSrc, beaverEatingAnimationArr, 200);

            setTimeout(() => {
                console.log("AFtER 1 ", beaver1EatingIntervalId)
                console.log("AFtER 2 ", beaver2EatingIntervalId)
            }, 100)

        } else {
            console.log("back to popup ")
            stopAnimationInterval(beaver1EatingIntervalId, setBeaver1EatingIntervalId, setBeaver1EatingSrc, beaverEatingAnimationArr);
            stopAnimationInterval(beaver2EatingIntervalId, setBeaver2EatingIntervalId, setBeaver2EatingSrc, beaverEatingAnimationArr);
        }
    }, [props.variables.inLessonProgress]);

    const handleBeaverPaneClick = () => {
        const next = () => {
            zoomOut("popup")
            props.functions.setInLessonProgress(true);

        }
        showTransitionScreen(next);
        // zoomOut("popup")
        // props.functions.setInLessonProgress(true);
    }

    const handleBeaverClick = () => {
        if (!props.variables.inLessonProgress) {
            playAudio([beaverEatingSound])
        }
    }

    const [beaver1Style, setBeaver1Style] = useState({
        transform: "scaleX(-1) rotate(-1deg)",
        zIndex: "19"
    });

    const [beaver2Style, setBeaver2EatingStyle] = useState({
        transform: "rotate(1deg)",
        zIndex: "19"
    });
    return (
        <>
            <div
                id="beaver-scene0"
                style={{
                    // height: "100%",
                    // width: "100%",
                    // borderRadius: "7px",
                    // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    // zIndex: 9999,
                }}
                onClick={handleBeaverPaneClick}
            >
                <img
                    draggable={false}
                    alt={"beaver 1"}
                    id={'scene0-beaver1'}
                    src={beaver1EatingSrc}
                    style={{
                        bottom: `${props.variables.inLessonProgress ? (sandHeight * 0.44 ) : (sandHeight * 0.65 )}px`,
                        left: `40% `,
                        width: `${beaverWidth}px`,
                        ...beaver1Style
                    }}
                    onMouseEnter={handleMouseEnterOnBeaver1Eating}
                    onMouseLeave={handleMouseLeaveOnBeaver1Eating}
                    onClick={handleBeaverClick}
                />
                <img
                    draggable={false}
                    alt={"beaver 2"}
                    id={'scene0-beaver2'}
                    src={beaver2EatingSrc}
                    style={{
                        bottom: `${props.variables.inLessonProgress ? (sandHeight * 0.55) : (sandHeight * 0.80)}px`,
                        left: `60%`,
                        width: `${beaverWidth}px`,
                        ...beaver2Style
                    }}
                    onMouseEnter={handleMouseEnterOnBeaver2Eating}
                    onMouseLeave={handleMouseLeaveOnBeaver2Eating}
                    onClick={handleBeaverClick}

                />

                <img
                    draggable={false}
                    id="sand"
                    ref={sandRef}
                    src={sand}
                    alt={"sand"}
                    style={{
                        bottom: `${props.variables.inLessonProgress ? -20 : 0}%`,
                    }}/>

                <img
                    draggable={false}
                    src={rock1}
                    alt={"rock1"}
                    style={{
                        width: "15%",
                        bottom: "5%",
                        left: "5%",
                        position: "absolute"
                    }}/>

                <img
                    draggable={false}
                    src={rock2}
                    alt={"rock2"}
                    style={{
                        width: "11%",
                        bottom: "15%",
                        right: "15%",
                        position: "absolute",
                    }}
                />
                <img
                    draggable={false}
                    src={rock3}
                    alt={"rock3"}
                    style={{
                        width: `${props.variables.inLessonProgress ? 25 : 15}vh`,
                        top: `${props.variables.inLessonProgress ? 30 : 15}vh`,
                        left: `${props.variables.inLessonProgress ? 30 : 15}vh`,
                        position: "absolute",
                    }}
                />
                <img
                    draggable={false}
                    src={logSrc}
                    alt={"log"}
                    style={{
                        width: `${props.variables.inLessonProgress ? 20 : 20}vh`,
                        top: `${props.variables.inLessonProgress ? 15 : -10}vh`,
                        right: `${props.variables.inLessonProgress ? 40 : 10}vh`,
                        position: "absolute",
                    }}

                />

            </div>
        </>
    )
}

export default BeaversScene0