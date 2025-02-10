// Beavers.jsx
import dynamicSize from "../../../functions/dynamicSize.js";
import {handleMouseEnterAnimation, handleMouseLeaveAnimation} from "../../../functions/animationInternal.js";

import DetailPaneButtonLayout from "../../../components/detail_pane_button_layout/DetailPaneButtonLayout.jsx";

import './beavers.css'


import {useState} from "react";

import beaver1 from './assets/beaver/beaver_1.svg'
import beaver2 from './assets/beaver/beaver_2.svg'
import beaver3 from './assets/beaver/beaver_3.svg'
import beaver4 from './assets/beaver/beaver_4.svg'

import sand from './assets/sand.svg'
import rock1 from './assets/beaver-rock1.svg'
import rock2 from './assets/beaver-rock2.svg'
import rock3 from './assets/beaver-rock3.svg'
import driftwood from './assets/beaver-driftwood.svg'

const beaverAnimationArr = [beaver1, beaver2, beaver3, beaver4];

function Beavers(props) {

    const [beaverWidth, setBeaverWidth] = useState(0)

    const [beaver1Top, setBeaver1Top] = useState(0)
    const [beaver1Left, setBeaver1Left] = useState(0)

    const [beaver2Top, setBeaver2Top] = useState(0)
    const [beaver2Left, setBeaver2Left] = useState(0)

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

    const [beaver1Src, setBeaver1Src] = useState(beaverAnimationArr[0]);
    const [beaver2Src, setBeaver2Src] = useState(beaverAnimationArr[0]);
    const [intervalId, setIntervalId] = useState(null); // Store interval ID


    const handleMouseEnter1 = () => {
        handleMouseEnterAnimation(intervalId, setIntervalId, beaver1Src, setBeaver1Src, beaverAnimationArr, 200);
    }

    const handleMouseLeave1 = () => {
        handleMouseLeaveAnimation(intervalId, setBeaver1Src, beaverAnimationArr);
    }

    const handleMouseEnter2 = () => {
        handleMouseEnterAnimation(intervalId, setIntervalId, beaver2Src, setBeaver2Src, beaverAnimationArr, 200);
    }

    const handleMouseLeave2 = () => {
        handleMouseLeaveAnimation(intervalId, setBeaver2Src, beaverAnimationArr);
    }


    // show the beaver review when click the beaver
    const [showBeaverPane, setShowBeaverPane] = useState(false); // State to control visibility

    const [beaver1Style, setBeaver1Style] = useState({
        transform: "scaleX(-1) rotate(-1deg)",
        zIndex: "19"
    });

    const [beaver2Style, setBeaver2Style] = useState({
        transform: "rotate(1deg)",
        zIndex: "19"
    });


    const handleBeaverAreaClick = () => {
        setBeaver1Style({
            transform: 'scale(1.2) scaleX(-1) rotate(-1deg) translateX(10px)',
            zIndex: '10000'
        });
        setBeaver2Style({
            transform: 'scale(1.2) rotate(1deg)',
            zIndex: '10000'
        });
        setShowBeaverPane(true);

    }


    // Update backToNormal function
    const backToNormal = () => {
        setBeaver1Style({
            transform: "scaleX(-1) rotate(-1deg)",
            zIndex: "19"
        });
        setBeaver2Style({
            transform: "rotate(1deg)",
            zIndex: "19"
        });
        setShowBeaverPane(false);
        console.log(showBeaverPane)
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
                onMouseEnter={handleMouseEnter1}
                onMouseLeave={handleMouseLeave1}
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
                onMouseEnter={handleMouseEnter2}
                onMouseLeave={handleMouseLeave2}
            />


            {showBeaverPane && <>
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
                    backToNormal();
                }}/>


                <div id="beaver-pane" style={{
                    position: "absolute",
                    top: "50%",
                    left: "60%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    // overflow: "hidden",
                    aspectRatio: "1/1",
                    minWidth: "700px",

                    zIndex: 9999,
                    border: "3px solid #FFD700",
                    animation: `
                            glow 2s ease-in-out infinite,
                            fadeIn 0.3s ease-out
                        `,
                    transformOrigin: 'center center',
                }}>
                    <img src={sand} alt={"sand"} style={{
                        width: "100%",
                        bottom: "0", position: "absolute"
                    }}/>
                    <DetailPaneButtonLayout cree={"Amisk"} english={"Beaver"} backToNormal={backToNormal}
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
                        src={driftwood}
                        alt={"driftwood"}
                        style={{
                            width: "20%",
                            top: "-10%",
                            right: "10%",
                            position: "absolute",
                        }}

                    />

                </div>
            </>
            }

        </div>
    )
}


export default Beavers;