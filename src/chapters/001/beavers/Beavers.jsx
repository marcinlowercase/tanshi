// Beavers.jsx
import dynamicSize from "../../../functions/dynamicSize.js";
import {loadAudio, playAudio, stopAudio} from "../../../functions/audioUtilities.js";
import {startAnimationInterval, stopAnimationInterval} from "../../../functions/animationInternal.js";
import {zoomOut, zoomIn} from "../../../functions/zoom.js";
import getAudioStringForSentence from "../../../functions/getAudioStringForSentence.js";

import './beavers.css'

// Scenes
import BeaversScene0 from "./scenes/BeaversScene0.jsx";
import BeaversScene1 from "./scenes/BeaversScene1.jsx";

const NUMBER_OF_SCENES = 4;
const beaversScenes = [BeaversScene0, BeaversScene1, BeaversScene2, BeaversScene3];

//
// // set up the audio path for sentences
// const audioURLOfScene = []
// const audioPaths = []
// for (let i = 0; i < NUMBER_OF_SCENES; i++) {
//      audioPaths.push( {
//          english: getAudioStringForSentence("001", "beavers", i, "english", "m4a"),
//          cree: getAudioStringForSentence("001", "beavers", i, "cree","m4a"),
//      });
// }
// for (let i = 0; i < NUMBER_OF_SCENES; i++) {
//
//     const audioURLs = {
//         english: new URL(audioPaths[i].english, import.meta.url).href,
//         cree: new URL(audioPaths[i].cree, import.meta.url).href,
//     }
//     audioURLOfScene.push(audioURLs)
// }


// MANUALLY prep the audio file
const creeAudioOfScene0URL = new URL("./assets/audio/transcript/cree/0.m4a", import.meta.url).href;
const creeAudioOfScene1URL = new URL("./assets/audio/transcript/cree/1.m4a", import.meta.url).href;
const creeAudioOfScene2URL = new URL("./assets/audio/transcript/cree/2.m4a", import.meta.url).href;
const creeAudioOfScene3URL = new URL("./assets/audio/transcript/cree/3.m4a", import.meta.url).href;

const englishAudioOfScene0URL = new URL("./assets/audio/transcript/english/0.m4a", import.meta.url).href;
const englishAudioOfScene1URL = new URL("./assets/audio/transcript/english/1.m4a", import.meta.url).href;
const englishAudioOfScene2URL = new URL("./assets/audio/transcript/english/2.m4a", import.meta.url).href;
const englishAudioOfScene3URL = new URL("./assets/audio/transcript/english/3.m4a", import.meta.url).href;

const highlightAudioOfScene0URL = new URL("./assets/audio/highlight/0.m4a", import.meta.url).href;
const highlightAudioOfScene1URL = new URL("./assets/audio/highlight/1.m4a", import.meta.url).href;
const highlightAudioOfScene2URL = new URL("./assets/audio/highlight/2.m4a", import.meta.url).href;
const highlightAudioOfScene3URL = new URL("./assets/audio/highlight/3.m4a", import.meta.url).href;


const audioURLOfScene = [
    {
        cree: creeAudioOfScene0URL,
        english: englishAudioOfScene0URL,
        highlight: highlightAudioOfScene0URL,
    },
    {
        cree: creeAudioOfScene1URL,
        english: englishAudioOfScene1URL,
        highlight: highlightAudioOfScene1URL,
    },
    {
        cree: creeAudioOfScene2URL,
        english: englishAudioOfScene2URL,
        highlight: highlightAudioOfScene2URL,
    },
    {
        cree: creeAudioOfScene3URL,
        english: englishAudioOfScene3URL,
        highlight: highlightAudioOfScene3URL,
    },
]
const scriptOfSceneBackBack = [
    {
        english: [
            {word: "Two", timestamp: 0, keyword: false},
            {word: "beavers", timestamp: 820, keyword: false},
            {word: "were sitting together", timestamp: 1372, keyword: false},
            {word: "on the beach", timestamp: 2471.2, keyword: false},
            {word: "chewing on", timestamp: 3496, keyword: false},
            {word: "some wood", timestamp: 4454.4, keyword: false},
        ],
        cree: [
            {word: "Nîso", timestamp: 0, keyword: false},
            {word: "amiskwak", timestamp: 1651.2, keyword: false},
            {word: "êhapicik", timestamp: 2227.2, keyword: false},
            {word: "yêkawiskâhk", timestamp: 3220, keyword: false},
            {word: "mâmâkwahcikêwak", timestamp: 4496, keyword: false},
            {word: "mistikwa", timestamp: 6372, keyword: true},
        ]

    },

]
const scriptOfScene = [
    {
        english: [
            {word: "Two", timestamp: 0, keyword: false},
            {word: "beavers", timestamp: 820, keyword: false},
            {word: "were sitting", timestamp: 1372, keyword: false},
            {word: "together", timestamp: 1934, keyword: false},
            {word: "on the beach", timestamp: 2471.2, keyword: false},
            {word: "chewing", timestamp: 3496, keyword: false},
            {word: "on", timestamp: 4248, keyword: false},
            {word: "some", timestamp: 4454.4, keyword: false},
            {word: "wood", timestamp: 4578.4, keyword: true},
        ],
        cree: [
            {word: "Nîso", timestamp: 0, keyword: false},
            {word: "amiskwak", timestamp: 1651.2, keyword: false},
            {word: "êhapicik", timestamp: 2227.2, keyword: false},
            {word: "yêkawiskâhk", timestamp: 3220, keyword: false},
            {word: "mâmâkwahcikêwak", timestamp: 4496, keyword: false},
            {word: "mistikwa", timestamp: 6372, keyword: true},
        ]

    },
    {
        english: [
            {word: "When a", timestamp: 0, keyword: false},
            {word: "log", timestamp: 668, keyword: true},
            {word: "floated by", timestamp: 1248, keyword: false},
            {word: "the", timestamp: 2372, keyword: false},
            {word: "two", timestamp: 2600, keyword: false},
            {word: "beavers", timestamp: 2694, keyword: false},
            {word: "grabbed it", timestamp: 3334.8, keyword: false},
            {word: "to add", timestamp: 3900.8, keyword: false},
            {word: "to their dam.", timestamp: 4562, keyword: false},
        ],
        cree: [
            {word: "Wâpamêwak", timestamp: 0, keyword: false},
            {word: "kotaka", timestamp: 808.4, keyword: false},
            {word: "mistikwa", timestamp: 1991.6, keyword: true},
            {word: "epimakhochinthit,", timestamp: 2529.2, keyword: false},
            {word: "êkwa ôma", timestamp: 3620, keyword: false},
            {word: "nîso", timestamp: 5000, keyword: false},
            {word: "amiskwak", timestamp: 5382, keyword: false},
            {word: "otihtinêwak", timestamp: 5951.2, keyword: false},
            {word: "mistikwa", timestamp: 7124, keyword: false},
            {word: "kê-ta", timestamp: 8000, keyword: false},
            {word: "âpacihêw", timestamp: 8826.4, keyword: false},
            {word: "antah", timestamp: 9565.2, keyword: false},
            {word: "oskwatim", timestamp: 11000, keyword: false},
            {word: "apachihachik.", timestamp: 11934, keyword: false}
        ]
    },
    {
        english: [
            {word: "They", timestamp: 0, keyword: false},
            {word: "also", timestamp: 430, keyword: false},
            {word: "found", timestamp: 868, keyword: false},
            {word: "a", timestamp: 1372, keyword: false},
            {word: "big rock", timestamp: 1620, keyword: true},
            {word: "which", timestamp: 3000, keyword: false},
            {word: "they", timestamp: 3289.2, keyword: false},
            {word: "took", timestamp: 3537.2, keyword: false},
            {word: "for", timestamp: 3868, keyword: false},
            {word: "their", timestamp: 4082.4, keyword: false},
            {word: "dam", timestamp: 4223.2, keyword: false},
            {word: "as well.", timestamp: 4744, keyword: false},
        ],
        cree: [
            {word: "Ahyak-asici", timestamp: 0, keyword: false},
            {word: "miskawêwak", timestamp: 2620, keyword: false},
            {word: "misti-asiniya", timestamp: 3214.8, keyword: true},
            {word: "êwakoni", timestamp: 4103.2, keyword: false},
            {word: "mîna otinêwak", timestamp: 4868, keyword: false},
            {word: "êwakoni mîna", timestamp: 5868, keyword: false},
            {word: "wî-âpacihêwchik", timestamp: 6661.2, keyword: false},
            {word: "mwêstas,", timestamp: 7686, keyword: false},
            {word: "oskwatimow", timestamp: 9248, keyword: false},
            {word: "kah-wî-osîhcitachik.", timestamp: 10206.4, keyword: false}
        ]
    },
    {
        english: [
            {word: "The", timestamp: 0, keyword: false},
            {word: "beavers", timestamp: 372, keyword: false},
            {word: "used", timestamp: 1000, keyword: false},
            {word: "the rock", timestamp: 1496, keyword: false},
            {word: "and", timestamp: 2000, keyword: false},
            {word: "the log", timestamp: 2446.4, keyword: false},
            {word: "to build", timestamp: 3124, keyword: false},
            {word: "a cozy", timestamp: 3620, keyword: false},
            {word: "dam", timestamp: 4206.4, keyword: true},
            {word: "where", timestamp: 4620, keyword: false},
            {word: "they", timestamp: 5000, keyword: false},
            {word: "could live.", timestamp: 5248, keyword: false},
        ],
        cree: [
            {word: "Êkonik aniki", timestamp: 0, keyword: false},
            {word: "nîso", timestamp: 1868, keyword: false},
            {word: "amiskwak", timestamp: 2182, keyword: false},
            {word: "âpacihêwak anihi", timestamp: 2706.4, keyword: false},
            {word: "misti-asiniya", timestamp: 3908.4, keyword: false},
            {word: "êkwa-mîna anihi", timestamp: 4602.4, keyword: false},
            {word: "mistikwa,", timestamp: 6124, keyword: false},
            {word: "osîhcitawak", timestamp: 7496, keyword: false},
            {word: "ani-mitho", timestamp: 8428.8, keyword: false},
            {word: "oskwatimow", timestamp: 9496, keyword: true},
            {word: "êkota", timestamp: 11000, keyword: false},
            {word: "mamymêtho-wîkichik.", timestamp: 11602, keyword: false}
        ]
    }

]
const scriptOfSceneBackup = [
    {
        english: "Two beavers were sitting together on the beach, chewing on some ****wood****.",
        cree: "Nîso amiskwak êhapicik yêkawiskâhk, mâmâkwahcikêwak ****mistikwa****. "
    },
    {
        english: "When a ****log**** floated by, the two beavers grabed it to add to their dam.",
        cree: "Wâpamêwak kotaka ****mistikwa**** epimakhochinthit, êkwa ôma nîso amiskwak otihtinêwak mistikwa kê-ta âpacihêw antah oskwatim apachihachik."
    },
    {
        english: "They also found a ****big rock****, which they took for their dam as well.",
        cree: "Ahyak-asici miskawêwak ****misti-asiniya**** êwakoni mîna otinêwak êwakoni mîna wî-âpacihêwchik mwêstas, oskwatimow kah-wî-osîhcitachik."
    },
    {
        english: "The beavers used the rock and the log to build a cozy ****dam**** where they could live.",
        cree: "Êkonik aniki nîso amiskwak âpacihêwak anihi misti-asiniya êkwa-mîna anihi mistikwa, osîhcitawak ani-mitho ****oskwatim****ow êkota mamymêtho-wîkichik."
    },

]
const questionOfScene = [
    {
        question: "Two beavers were sitting together on the beach, chewing on some ___.",
        options: [
            {
                cree: "mistikwa",
                english: "wood",
                correct: true,
            },
            {
                cree: "misti-asiniy",
                english: "big rock",
                correct: false,
            }
        ]
    },
    {
        question: "When a ___ floated by, the two beavers grabed it to add to their dam.",
        options: [
            {
                cree: "mistikwa",
                english: "log",
                correct: true,
            },
            {
                cree: "oskwatim",
                english: "dam",
                correct: false,
            }
        ]
    },
    {
        question: "They also found a ___, which they took for their dam as well.",
        options: [
            {
                cree: "mistikwa",
                english: "log",
                correct: false,
            },
            {
                cree: "misti-asiniy",
                english: "big rock",
                correct: true,
            }
        ]
    },
    {
        question: "The beavers used the rock and the log to build a cozy ___ where they could live.",
        options: [
            {
                cree: "mistikwa",
                english: "wood",
                correct: false,
            },
            {
                cree: "oskwatim",
                english: "dam",
                correct: true,
            }
        ]
    }

]
const titleOfScene = [
    "Beavers on the beach",
    "Beavers with the log",
    "Beavers with the rock",
    "Beavers build their dam",
]
const content = {
    audioURLOfScene: audioURLOfScene,
    scriptOfScene: scriptOfScene,
    questionOfScene: questionOfScene,
    titleOfScene: titleOfScene,
}
import {useEffect, useRef, useState} from "react";


import beaver1 from './assets/img/beaver/beaver1.svg'
import beaver2 from './assets/img/beaver/beaver2.svg'
import beaver3 from './assets/img/beaver/beaver3.svg'
import beaver4 from './assets/img/beaver/beaver4.svg'

import Scene from "../../../components/scene/Scene.jsx";
import BeaversScene2 from "./scenes/BeaversScene2.jsx";
import BeaversScene3 from "./scenes/BeaversScene3.jsx";
import LessonLoadingScreen from "../../../components/lesson_loading_screen/LessonLoadingScreen.jsx";


const beaverAnimationArr = [beaver1, beaver2, beaver3, beaver4];

const popupDimension = {
    top: "50%",
    left: "60%",
    height: "70vh",
    width: "60vw",
};


// SCENE 0 SOUND

const beaverEatingSoundURL = new URL("./assets/audio/eating-beaver.mp3", import.meta.url).href;
const lakeBackgroundSoundURL = new URL("./assets/audio/lake-background.mp3", import.meta.url).href;
const windBackgroundSoundURL = new URL("./assets/audio/wind-background.mp3", import.meta.url).href;


function Beavers(props) {

    const [beaverWidth, setBeaverWidth] = useState(0)

    const [beaver1Top, setBeaver1Top] = useState(0)
    const [beaver1Left, setBeaver1Left] = useState(0)

    const [beaver2Top, setBeaver2Top] = useState(0)
    const [beaver2Left, setBeaver2Left] = useState(0)

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

// SCENE 0  sound
    const beaverEatingSound = useRef(new Audio((beaverEatingSoundURL)));
    const lakeBackgroundSound = useRef(new Audio(lakeBackgroundSoundURL));
    const windBackgroundSound = useRef(new Audio(windBackgroundSoundURL));
    const creeAudioOfScene0 = useRef(new Audio(content.audioURLOfScene[0].cree));
    const englishAudioOfScene0 = useRef(new Audio(content.audioURLOfScene[0].english));
    useEffect(() => {
        loadAudio([
            {audio: beaverEatingSound, audioURL: beaverEatingSoundURL},
            {audio: lakeBackgroundSound, audioURL: lakeBackgroundSoundURL},
            {audio: windBackgroundSound, audioURL: windBackgroundSoundURL},
            {audio: creeAudioOfScene0, audioURL: content.audioURLOfScene[0].cree},
            {audio: englishAudioOfScene0, audioURL: content.audioURLOfScene[0].english},
        ])
        // beaverEatingSound.current = new Audio(beaverEatingSoundURL);
        // beaverEatingSound.current.load();
        // lakeBackgroundSound.current = new Audio(lakeBackgroundSoundURL);
        // lakeBackgroundSound.current.load();
        // windBackgroundSound.current = new Audio(windBackgroundSoundURL);
        // windBackgroundSound.current.load();


    }, []);


    useEffect(() => {
        if (props.variables.showPopup) {
            updateSandDimensions();
            window.addEventListener('resize', updateSandDimensions);

            // Clean up the event listener when the component unmounts or props.variables.showPopup changes to false
            return () => {
                window.removeEventListener('resize', updateSandDimensions);
            };


        }
    }, [props.variables.showPopup]);


    const handleBeaversProperties = () => {
        requestAnimationFrame(() => {

            setBeaverWidth(dynamicSize(0.08))

            setBeaver1Top(props.variables.lakeTop + props.variables.lakeHeight * 0.30)
            setBeaver1Left(props.variables.lakeLeft + props.variables.lakeWidth * 0.59)

            setBeaver2Top(props.variables.lakeTop + props.variables.lakeHeight * 0.20)
            setBeaver2Left(props.variables.lakeLeft + props.variables.lakeWidth * 0.7)
        })
    }


    handleBeaversProperties();


    const [beaver1Src, setBeaver1Src] = useState(beaverAnimationArr[0]);
    const [beaver2Src, setBeaver2Src] = useState(beaverAnimationArr[0]);
    const [beaver1IntervalId, setBeaver1IntervalId] = useState(null);
    const [beaver2IntervalId, setBeaver2IntervalId] = useState(null);


    const handleMouseEnterOnBeaver1 = () => {
        if (!props.variables.inLessonProgress) {
            startAnimationInterval(beaver1IntervalId, setBeaver1IntervalId, beaver1Src, setBeaver1Src, beaverAnimationArr, 200);
        }
    }

    const handleMouseLeaveOnBeaver1 = () => {
        if (!props.variables.inLessonProgress) {
            stopAnimationInterval(beaver1IntervalId, setBeaver1IntervalId, setBeaver1Src, beaverAnimationArr);
        }
    }

    const handleMouseEnterOnBeaver2 = () => {
        if (!props.variables.inLessonProgress) {
            startAnimationInterval(beaver2IntervalId, setBeaver2IntervalId, beaver2Src, setBeaver2Src, beaverAnimationArr, 200);
        }

    }

    const handleMouseLeaveOnBeaver2 = () => {
        if (!props.variables.inLessonProgress) {
            stopAnimationInterval(beaver2IntervalId, setBeaver2IntervalId, setBeaver2Src, beaverAnimationArr);
            stopAudio([beaverEatingSound])
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

        if (!props.variables.showPopup) {
            props.functions.setShowPopup(true);
            // load audio to play
            //
            // for (const urls of audioURLOfScene) {
            //     const creeAudio = new Audio(urls.cree);
            //     creeAudio.current = new Audio(urls.cree)
            //     const englishAudio = new Audio(urls.english);
            //     englishAudio.current = new Audio(urls.english)
            //
            //     beaversStoryAudio.push({
            //         cree: creeAudio,
            //         english: englishAudio,
            //     });
            // }

            playAudio({
                audioArray: [lakeBackgroundSound, windBackgroundSound],
                loop: true,
                volume: 0.5,
            });
        } else {
            // props.functions.setInLessonProgress(true);
        }

    }

    const handleBeaverClick = () => {
        if (!props.variables.inLessonProgress) {
            playAudio({
                audioArray: [beaverEatingSound],
                loop: true,
                volume: 0.5,
            });
        }
    }


    // Update backToNormal function
    const backToNormal = () => {
        console.log("backToNormal");
        if (!props.variables.inLessonProgress) {
            props.functions.setShowPopup(false);
            stopAudio([lakeBackgroundSound, windBackgroundSound]);
        } else {
            props.functions.setInLessonProgress(false);
            zoomIn("popup", popupDimension)
        }

    }

    return (
        <div id={"beaversArea"} onClick={handleBeaverAreaClick}>
            <LessonLoadingScreen text={"Amisk - Beaver"}/>
            <img
                draggable={false}
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
                draggable={false}
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


            {props.variables.showPopup
                &&
                <Scene
                    scenes={beaversScenes}
                    variables={{
                        beaver1Src: beaver1Src,
                        beaver2Src: beaver2Src,
                        beaver1Style: beaver1Style,
                        beaver2Style: beaver2Style,
                        beaverEatingSound: beaverEatingSound,
                        beaverWidth: beaverWidth,
                        content: content,
                        cree: "Amisk",
                        creeAudioOfScene0: creeAudioOfScene0,
                        english: "Beaver",
                        englishAudioOfScene0: englishAudioOfScene0,
                        inLessonProgress: props.variables.inLessonProgress,
                        lakeBackgroundSound: lakeBackgroundSound,
                        numberOfScenes: NUMBER_OF_SCENES,
                        popupDimension: popupDimension,
                        sandHeight: sandHeight,
                        sandRef: sandRef,
                        sandTop: sandTop,
                        showPopup: props.variables.showPopup,
                        windBackgroundSound: windBackgroundSound,
                    }}
                    functions={{
                        ...props.functions,
                        backToNormal: backToNormal,
                        handleBeaverClick: handleBeaverClick,
                        // setInLessonProgress: props.functions.setInLessonProgress,

                    }}
                />

            }

        </div>
    )
}


export default Beavers;