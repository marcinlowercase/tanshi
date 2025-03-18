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




const BeaversScene0 = (props) => {

    const [logSrc, setLogSrc] = useState(logAnimationArr[0]);
    const [logIntervalId, setLogIntervalId] = useState(null);

    useEffect(() => {
        console.log("Show panen")
        // NEED TO CALL when showBeaverPane turn true
        if (props.showBeaverPane) startAnimationInterval(logIntervalId, setLogIntervalId, logSrc, setLogSrc, logAnimationArr, 200)
        else stopAnimationInterval(logIntervalId, setLogSrc, logAnimationArr)
    }, [props.showBeaverPane])

    const handleBeaverPaneClick = () => {
        zoomOut("beaver-scene1")
    }

    return (
        <>
            {/* Blur overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 9998,
                animation: 'fadeInOverlay 0.3s ease-out',

            }} onClick={(e) => {
                e.stopPropagation();  // Add this line
                props.backToNormal();
            }}/>


            <div id="beaver-scene1" style={{
                position: "absolute",
                top: props.popupDimension.top,
                left: props.popupDimension.left,
                height: props.popupDimension.height,
                width: props.popupDimension.width,

                transform: "translate(-50%, -50%)",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                // overflow: "hidden",
                aspectRatio: "1/1",
                minWidth: "700px",
                // height: "100%",
                // width: "100%",

                zIndex: 9999,
                border: "3px solid #FFD700",
                animation: `
                            glow 2s ease-in-out infinite,
                            fadeIn 0.3s ease-out
                        `,
                transformOrigin: 'center center',
            }}
                 onClick={handleBeaverPaneClick}
            >

                <img
                    alt={"beaver 1"}
                    id={'scene1-beaver1'}
                    src={props.beaver1Src}
                    style={{
                        position: "absolute",
                        minWidth: "30px",
                        top: `${props.sandTop - props.sandHeight * 0.35}px`,
                        left: `40% `,
                        transform: "scaleX(-1) rotate(-1deg)",
                        width: `${props.beaverWidth}px`,
                        zIndex: "19",
                        ...props.beaver1Style
                    }}
                    onMouseEnter={props.handleMouseEnterOnBeaver1}
                    onMouseLeave={props.handleMouseLeaveOnBeaver1}
                    onClick={props.handleBeaverClick}
                />
                <img
                    alt={"beaver 2"}
                    id={'scene1-beaver2'}
                    src={props.beaver2Src}
                    style={{
                        position: "absolute",
                        minWidth: "30px",
                        top: `${props.sandTop - props.sandHeight * 0.5}px`,
                        left: `60%`,
                        transform: "rotate(1deg)",
                        width: `${props.beaverWidth}px`,
                        zIndex: "19",
                        ...props.beaver2Style
                    }}
                    onMouseEnter={props.handleMouseEnterOnBeaver2}
                    onMouseLeave={props.handleMouseLeaveOnBeaver2}
                    onClick={props.handleBeaverClick}

                />

                <img id="sand" ref={props.sandRef} src={sand} alt={"sand"} style={{
                    width: "100%",
                    bottom: "0", position: "absolute"
                }}/>
                />
                <img src={rock1} alt={"rock1"} style={{
                    width: "15%",
                    bottom: "5%",
                    left: "5%",
                    position: "absolute"
                }}/>

                <img
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