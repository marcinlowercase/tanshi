import beaver from '../assets/beaver.svg'
import dynamicSize from "../functions/dynamicSize.js";
import {useState} from "react";

import beaver1 from '../assets/svg/beaver/beaver_1.svg'
import beaver2 from '../assets/svg/beaver/beaver_2.svg'
import beaver3 from '../assets/svg/beaver/beaver_3.svg'
import beaver4 from '../assets/svg/beaver/beaver_4.svg'
import {handleMouseEnterAnimation, handleMouseLeaveAnimation} from "../functions/animationInternal.js";

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

    return (
        <div id={"beaversArea"}>
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
                    transform: "rotate(deg)",
                    width: `${beaverWidth}px`,
                    zIndex: "19",
                }}
                onMouseEnter={handleMouseEnter2}
                onMouseLeave={handleMouseLeave2}
            />
        </div>
    )
}

export default Beavers;