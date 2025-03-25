// Beavers.jsx
import dynamicSize from "../../../functions/dynamicSize.js";
import {playAudio, stopAudio} from "../../../functions/audioUtilities.js";
import {startAnimationInterval, stopAnimationInterval} from "../../../functions/animationInternal.js";
import {zoomOut, zoomIn} from "../../../functions/zoom.js";

import './beavers.css'

// Scenes
import BeaversScene0 from "./scenes/BeaversScene0.jsx";
import BeaversScene1 from "./scenes/BeaversScene1.jsx";

const NUMBER_OF_SCENES = 4;
const beaversScenes = [BeaversScene0, BeaversScene1, BeaversScene2, BeaversScene3];

const audioPathOfSentence = [
    [
        {
            english: "./assets/audio/transcript/english/00.m4a",
            cree: "./assets/audio/transcript/cree/00.m4a",
        },
        {
            english: "./assets/audio/transcript/english/01.m4a",
            cree: "./assets/audio/transcript/cree/01.m4a",
        },
    ],
    [
        {
            english: "./assets/audio/transcript/english/10.m4a",
            cree: "./assets/audio/transcript/cree/10.m4a",
        },
        {
            english: "./assets/audio/transcript/english/11.m4a",
            cree: "./assets/audio/transcript/cree/11.m4a",
        }
    ],
    [
        {
            english: "./assets/audio/transcript/english/20.m4a",
            cree: "./assets/audio/transcript/cree/20.m4a",
        },
    ],
    [
        {
            english: "./assets/audio/transcript/english/30.m4a",
            cree: "./assets/audio/transcript/cree/30.m4a",
        },
        {
            english: "./assets/audio/transcript/english/31.m4a",
            cree: "./assets/audio/transcript/cree/31.m4a",
        }
    ],


]

const scriptOfScene = [
    {
        english: "Two beavers were sitting together on the beach, chewing on some wood.",
        cree: "Nîso amiskwak êsa ê-ocipahcîpicik ê-itêhko-kîwêsîskak, mitikok ê-mah-mîwâcik."
    },
    {
        english: "When they saw the logs floating, the two beavers grabbed them to add to their dam.",
        cree: "Kâh-wâpamâcik êsa mistikwak ikota ê-pimâhôcik, nîso aniki amiskwak ocî-pîhtêwak, ê-wîkâpahcîhâtîcik ôta oskâtimikw."
    },
    {
        english: "They also found big rocks, which they took for their dam as well.",
        cree: "Âhâyak mîna miskawêwak mistahi asiniyak, ê-îkôni mîna otinîwak, oskâtimikw ê-wî-ayôtahcik."
    },
    {
        english: "The beavers used the rocks and the logs to build a cozy dam where they could live.",
        cree: "Ê-kî-aniki amiskwak wî-yâh-pahcîhâtîcik asiniyak ikwa mistikwak, kîta ê-sîhtâhcik oskâtimikw, ikota tê-wî-kîcik."
    },

]

import {useEffect, useRef, useState} from "react";


import beaver1 from './assets/beaver/beaver_1.svg'
import beaver2 from './assets/beaver/beaver_2.svg'
import beaver3 from './assets/beaver/beaver_3.svg'
import beaver4 from './assets/beaver/beaver_4.svg'

import log1 from './assets/beaver-log/beaver-log1.svg'
import log2 from './assets/beaver-log/beaver-log2.svg'
import log3 from './assets/beaver-log/beaver-log3.svg'
import Scene from "../../../components/scene/Scene.jsx";
import BeaversScene2 from "./scenes/BeaversScene2.jsx";
import BeaversScene3 from "./scenes/BeaversScene3.jsx";

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
    const [showPopup, setshowPopup] = useState(false); // State to control visibility

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
        if (showPopup) {
            updateSandDimensions();
            window.addEventListener('resize', updateSandDimensions);
            // Clean up the event listener when the component unmounts or showPopup changes to false
            return () => {
                window.removeEventListener('resize', updateSandDimensions);
            };
        }
    }, [showPopup]);


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


    // setup sound effect
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


    const startBeaversEatingAnimation = () => {
        startAnimationInterval(beaverIntervalId, setBeaverIntervalId, beaver1Src, setBeaver1Src, beaverAnimationArr, 200);
        startAnimationInterval(beaverIntervalId, setBeaverIntervalId, beaver2Src, setBeaver2Src, beaverAnimationArr, 200);
    }

    const handleMouseEnterOnBeaver1 = () => {
        if (!beaverInProgress) {
            startAnimationInterval(beaverIntervalId, setBeaverIntervalId, beaver1Src, setBeaver1Src, beaverAnimationArr, 200);
            if (showPopup) playAudio([eatingBeaverSound]);
        }
    }

    const handleMouseLeaveOnBeaver1 = () => {
        if (!beaverInProgress) {
            stopAnimationInterval(beaverIntervalId, setBeaver1Src, beaverAnimationArr);
            stopAudio([eatingBeaverSound]);
        }
    }

    const handleMouseEnterOnBeaver2 = () => {
        if (!beaverInProgress) {
            startAnimationInterval(beaverIntervalId, setBeaverIntervalId, beaver2Src, setBeaver2Src, beaverAnimationArr, 200);
            if (showPopup) playAudio([eatingBeaverSound]);
        }

    }

    const handleMouseLeaveOnBeaver2 = () => {
        if (!beaverInProgress) {
            stopAnimationInterval(beaverIntervalId, setBeaver2Src, beaverAnimationArr);
            stopAudio([eatingBeaverSound])
        }
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

        if (!showPopup) {
            setshowPopup(true);
            playAudio([lakeBackgroundSound, windBackgroundSound]);
        } else {
            setBeaverInProgress(true);
        }

    }

    const handleBeaverClick = () => {
        if (!beaverInProgress) {
            playAudio([eatingBeaverSound])
        }
    }


    // Update backToNormal function
    const backToNormal = () => {
        console.log("backToNormal");
        if (!beaverInProgress) {
            setshowPopup(false);
            stopAudio([lakeBackgroundSound, windBackgroundSound]);
        } else {
            setBeaverInProgress(false);
            zoomIn("popup", popupDimension)
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


            {showPopup
                &&
                <Scene
                    scenes={beaversScenes}
                    variables={{
                        beaver1Src: beaver1Src,
                        beaver2Src: beaver2Src,
                        beaverWidth: beaverWidth,
                        beaver1Style: beaver1Style,
                        beaver2Style: beaver2Style,
                        cree: "Amisk",
                        eatingBeaverSound: eatingBeaverSound,
                        english: "Beaver",
                        inProgress: beaverInProgress,
                        popupDimension: popupDimension,
                        numberOfScenes: NUMBER_OF_SCENES,
                        sandHeight: sandHeight,
                        sandRef: sandRef,
                        sandTop: sandTop,
                        scriptOfScene: scriptOfScene,
                        showPopup: showPopup,


                    }}
                    functions={{
                        backToNormal: backToNormal,
                        handleBeaverClick: handleBeaverClick,
                        handleMouseEnterOnBeaver1: handleMouseEnterOnBeaver1,
                        handleMouseEnterOnBeaver2: handleMouseEnterOnBeaver2,
                        handleMouseLeaveOnBeaver1: handleMouseLeaveOnBeaver1,
                        handleMouseLeaveOnBeaver2: handleMouseLeaveOnBeaver2,
                        startBeaversEatingAnimation: startBeaversEatingAnimation,

                    }}
                />

            }

        </div>
    )
}


export default Beavers;