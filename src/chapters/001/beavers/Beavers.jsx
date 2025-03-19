// Beavers.jsx
import dynamicSize from "../../../functions/dynamicSize.js";
import {startAnimationInterval, stopAnimationInterval} from "../../../functions/animationInternal.js";
import {playAudio, stopAudio} from "../../../functions/audioUtilities.js";
import {zoomOut, zoomIn} from "../../../functions/zoom.js";

import DetailPaneButtonLayout from "../../../components/detail_pane_button_layout/DetailPaneButtonLayout.jsx";

import './beavers.css'

// Scenes
import BeaversScene0 from "./scenes/BeaversScene0.jsx";
import BeaversScene1 from "./scenes/BeaversScene1.jsx";

const beaversScenes = [BeaversScene0, BeaversScene1];


import {useEffect, useRef, useState} from "react";

import beaver1 from './assets/beaver/beaver_1.svg'
import beaver2 from './assets/beaver/beaver_2.svg'
import beaver3 from './assets/beaver/beaver_3.svg'
import beaver4 from './assets/beaver/beaver_4.svg'

import log1 from './assets/beaver-log/beaver-log1.svg'
import log2 from './assets/beaver-log/beaver-log2.svg'
import log3 from './assets/beaver-log/beaver-log3.svg'

const eatingBeaverSoundURL = new URL("./assets/audio/eating-beaver.mp3", import.meta.url).href;
const lakeBackgroundSoundURL = new URL("./assets/audio/lake-background.mp3", import.meta.url).href;
const windBackgroundSoundURL = new URL("./assets/audio/wind-background.mp3", import.meta.url).href;

const beaverAnimationArr = [beaver1, beaver2, beaver3, beaver4];
// const logAnimationArr = [log1, log2, log3];

const popupDimension = {
    top: "50%",
    left: "60%",
    height: "70vh",
    width: "60vw",
};


function Beavers(props) {

    const [beaverWidth, setBeaverWidth] = useState(0)

    const [beaver1Top, setBeaver1Top] = useState(0)
    const [beaver1Left, setBeaver1Left] = useState(0)

    const [beaver2Top, setBeaver2Top] = useState(0)
    const [beaver2Left, setBeaver2Left] = useState(0)

    // show the beaver review when click the beaver
    const [showBeaverPane, setShowBeaverPane] = useState(false); // State to control visibility

    const [beaverInProgress, setBeaverInProgress] = useState(false);

    const sandRef = useRef(null);  // Create a ref for the sand image
    const [sandTop, setSandTop] = useState(0);
    const [sandHeight, setSandHeight] = useState(0);

    const updateSandDimensions = () => {
        const sandElement = sandRef.current; // Get the DOM node

        if (sandElement) {
            const checkDimensions = () => {
                const rect = sandElement.getBoundingClientRect();
                if (rect.height > 0 && rect.width > 0) {
                    setSandTop(rect.top);
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
        if (showBeaverPane) {
            updateSandDimensions();
            window.addEventListener('resize', updateSandDimensions);
            // Clean up the event listener when the component unmounts or showBeaverPane changes to false
            return () => {
                window.removeEventListener('resize', updateSandDimensions);
            };
        }
    }, [showBeaverPane]);


    const handleBeaversProperties = () => {
        requestAnimationFrame(() => {

            setBeaverWidth(dynamicSize(0.08))

            setBeaver1Top(props.lakeTop + props.lakeHeight * 0.52)
            setBeaver1Left(props.lakeLeft + props.lakeWidth * 0.59)

            setBeaver2Top(props.lakeTop + props.lakeHeight * 0.38)
            setBeaver2Left(props.lakeLeft + props.lakeWidth * 0.7)
        })
    }


    handleBeaversProperties();


    // setup soundn effect
    const eatingBeaverSound = useRef(new Audio((eatingBeaverSoundURL)));
    const lakeBackgroundSound = useRef(new Audio(lakeBackgroundSoundURL));
    const windBackgroundSound = useRef(new Audio(windBackgroundSoundURL));
    useEffect(() => {
        eatingBeaverSound.current = new Audio(eatingBeaverSoundURL);
        eatingBeaverSound.current.load();
        lakeBackgroundSound.current = new Audio(lakeBackgroundSoundURL);
        lakeBackgroundSound.current.load();
        windBackgroundSound.current = new Audio(windBackgroundSoundURL);
        windBackgroundSound.current.load();
    }, []);


    const [beaver1Src, setBeaver1Src] = useState(beaverAnimationArr[0]);
    const [beaver2Src, setBeaver2Src] = useState(beaverAnimationArr[0]);
    const [beaverIntervalId, setBeaverIntervalId] = useState(null);


    const handleMouseEnterOnBeaver1 = () => {
        startAnimationInterval(beaverIntervalId, setBeaverIntervalId, beaver1Src, setBeaver1Src, beaverAnimationArr, 200);
        if (showBeaverPane) playAudio([eatingBeaverSound]);
    }

    const handleMouseLeaveOnBeaver1 = () => {
        stopAnimationInterval(beaverIntervalId, setBeaver1Src, beaverAnimationArr);
        stopAudio([eatingBeaverSound]);
    }

    const handleMouseEnterOnBeaver2 = () => {
        startAnimationInterval(beaverIntervalId, setBeaverIntervalId, beaver2Src, setBeaver2Src, beaverAnimationArr, 200);
        if (showBeaverPane) playAudio([eatingBeaverSound]);
    }

    const handleMouseLeaveOnBeaver2 = () => {
        stopAnimationInterval(beaverIntervalId, setBeaver2Src, beaverAnimationArr);
        stopAudio([eatingBeaverSound])
    }


    const [beaver1Style, setBeaver1Style] = useState({
        transform: "scaleX(-1) rotate(-1deg)",
        zIndex: "19"
    });

    const [beaver2Style, setBeaver2Style] = useState({
        transform: "rotate(1deg)",
        zIndex: "19"
    });


    const handleBeaverAreaClick = () => {

        if (!showBeaverPane) {
            // setBeaver1Style({
            //     transform: 'scale(1.2) scaleX(-1) rotate(-1deg) translateX(10px)',
            //     zIndex: '10000'
            // });
            // setBeaver2Style({
            //     transform: 'scale(1.2) rotate(1deg)',
            //     zIndex: '10000'
            // });
            setShowBeaverPane(true);
            playAudio([lakeBackgroundSound, windBackgroundSound]);
        } else {
            setBeaverInProgress(true);

        }

    }

    const handleBeaverClick = () => {
        playAudio([eatingBeaverSound])
    }


    // Update backToNormal function
    const backToNormal = () => {
        // setBeaver1Style({
        //     transform: "scaleX(-1) rotate(-1deg)",
        //     zIndex: "19"
        // });
        // setBeaver2Style({
        //     transform: "rotate(1deg)",
        //     zIndex: "19"
        // });
        console.log("backToNormal");
        if (!beaverInProgress) {
            setShowBeaverPane(false);
            stopAudio([lakeBackgroundSound, windBackgroundSound]);
        } else {
            setBeaverInProgress(false);
            zoomIn("beaver-scene1", popupDimension)
        }

    }

    return (
        <div id={"beaversArea"} onClick={handleBeaverAreaClick}>
            <img
                alt={"beaver 1"}
                id={'beaver1'}
                src={beaver1Src}
                style={{
                    position: "absolute",
                    minWidth: "30px",
                    top: `${beaver1Top}px`,
                    left: `${beaver1Left}px`,
                    transform: "scaleX(-1) rotate(-1deg)",
                    width: `${beaverWidth}px`,
                    zIndex: "19",
                    ...beaver1Style
                }}
                onMouseEnter={handleMouseEnterOnBeaver1}
                onMouseLeave={handleMouseLeaveOnBeaver1}
                onClick={handleBeaverClick}
            />
            <img
                alt={"beaver 2"}
                id={'beaver2'}
                src={beaver2Src}
                style={{
                    position: "absolute",
                    minWidth: "30px",
                    top: `${beaver2Top}px`,
                    left: `${beaver2Left}px`,
                    transform: "rotate(1deg)",
                    width: `${beaverWidth}px`,
                    zIndex: "19",
                    ...beaver2Style
                }}
                onMouseEnter={handleMouseEnterOnBeaver2}
                onMouseLeave={handleMouseLeaveOnBeaver2}
                onClick={handleBeaverClick}

            />


            {showBeaverPane
                &&
                <DetailPaneButtonLayout
                    scenes={beaversScenes}
                    backToNormal={backToNormal}
                    inProgress={beaverInProgress}
                    cree={"Amisk"}
                    english={"Beaver"}
                    popupDimension={popupDimension}
                    beaver1Src={beaver1Src}
                    beaver2Src={beaver2Src}
                    beaver1Style={beaver1Style}
                    beaver2Style={beaver2Style}
                    handleMouseEnterOnBeaver1={handleMouseEnterOnBeaver1}
                    handleMouseLeaveOnBeaver1={handleMouseLeaveOnBeaver1}
                    handleMouseEnterOnBeaver2={handleMouseEnterOnBeaver2}
                    handleMouseLeaveOnBeaver2={handleMouseLeaveOnBeaver2}
                    handleBeaverClick={handleBeaverClick}
                    sandTop={sandTop}
                    sandHeight={sandHeight}
                    sandRef={sandRef}
                    beaverWidth={beaverWidth}
                    showBeaverPane={showBeaverPane}

                />
            }

        </div>
    )
}


export default Beavers;