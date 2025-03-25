import sand from "../assets/sand.svg";
import rock1 from "../assets/beaver-rock1.svg";
import rock2 from "../assets/beaver-rock2.svg";
import rock3 from "../assets/beaver-rock3.svg";
import {zoomOut} from "../../../../functions/zoom.js";
import {useEffect, useState} from "react";
import {startAnimationInterval, stopAnimationInterval} from "../../../../functions/animationInternal.js";
import log1 from "../assets/beaver-log/beaver-log1.svg";
import log2 from "../assets/beaver-log/beaver-log2.svg";
import log3 from "../assets/beaver-log/beaver-log3.svg";

const logAnimationArr = [log1, log2, log3];


import LessonTopBar from "../../../../components/lesson_top_bar/LessonTopBar.jsx";
import {stopAudio} from "../../../../functions/audioUtilities.js";

const ENGLISH_SCRIPT = "Two beavers were sitting together on the beach, chewing on some wood.";
const CREE_SCRIPT = "";


const BeaversScene0 = (props) => {

    const [logSrc, setLogSrc] = useState(logAnimationArr[0]);
    const [logIntervalId, setLogIntervalId] = useState(null);


    useEffect(() => {
        // NEED TO CALL when showPopup turn true
        if (props.variables.showPopup) startAnimationInterval(logIntervalId, setLogIntervalId, logSrc, setLogSrc, logAnimationArr, 200)
        else stopAnimationInterval(logIntervalId, setLogSrc, logAnimationArr)
    }, [props.variables.showPopup])

    useEffect(() => {

        if (props.variables.inLessonProgress) {
            stopAudio([props.variables.eatingBeaverSound]);
            // stop animations first then start it again
            props.functions.stopBeaversEatingAnimation();
            props.functions.startBeaversEatingAnimation();
        }
    }, [props.variables.inLessonProgress], props.variables.currentSceneNumber);

    const handleBeaverPaneClick = () => {
        zoomOut("popup")
        props.functions.setInLessonProgress(true);
    }

    return (
        <>
            <div
                id="beaver-scene0"
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "7px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    zIndex: 9999,
                }}
                onClick={handleBeaverPaneClick}
            >
                <img
                    draggable={false}
                    alt={"beaver 1"}
                    id={'scene1-beaver1'}
                    src={props.variables.beaver1Src}
                    style={{
                        position: "absolute",
                        minWidth: "30px",
                        bottom: `${props.variables.sandHeight * 0.65}px`,
                        left: `40% `,
                        transform: "scaleX(-1) rotate(-1deg)",
                        width: `${props.variables.beaverWidth}px`,
                        zIndex: "19",
                        ...props.variables.beaver1Style
                    }}
                    onMouseEnter={props.functions.handleMouseEnterOnBeaver1}
                    onMouseLeave={props.functions.handleMouseLeaveOnBeaver1}
                    onClick={props.functions.handleBeaverClick}
                />
                <img
                    draggable={false}
                    alt={"beaver 2"}
                    id={'scene1-beaver2'}
                    src={props.variables.beaver2Src}
                    style={{
                        position: "absolute",
                        minWidth: "30px",
                        // top: `${props.variables.sandTop - props.variables.sandHeight * 0.5}px`,
                        bottom: `${props.variables.sandHeight * 0.80}px`,
                        left: `60%`,
                        transform: "rotate(1deg)",
                        width: `${props.variables.beaverWidth}px`,
                        zIndex: "19",
                        ...props.variables.beaver2Style
                    }}
                    onMouseEnter={props.functions.handleMouseEnterOnBeaver2}
                    onMouseLeave={props.functions.handleMouseLeaveOnBeaver2}
                    onClick={props.functions.handleBeaverClick}

                />

                <img
                    draggable={false} id="sand" ref={props.variables.sandRef} src={sand} alt={"sand"} style={{
                    width: "100%",
                    bottom: "0", position: "absolute"
                }}/>

                <img
                    draggable={false} src={rock1} alt={"rock1"} style={{
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
                        width: "25%",
                        top: "15%",
                        left: "15%",
                        position: "absolute",
                    }}
                />
                <img
                    draggable={false}
                    src={logSrc}
                    alt={"log"}
                    style={{
                        width: "20%",
                        top: "-10%",
                        right: "10%",
                        position: "absolute",
                    }}

                />

            </div>
        </>
    )
}

export default BeaversScene0