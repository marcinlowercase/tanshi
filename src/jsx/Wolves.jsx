import wolf from "../assets/wolf.svg"
import {useRef, useState} from "react";

import dynamicSize from "../functions/dynamicSize.js";


function Wolves(props) {

    const bigWolfRef = useRef(null);

    const [bigWolfWidth, setBigWolfWidth] = useState(0);
    const [smallWolfWidth, setSmallWolfWidth] = useState(0);

    const [wolfTop, setWolfTop] = useState(0);
    const [wolfLeft, setWolfLeft] = useState(0);

    const [smallWolfLeft, setSmallWolfLeft] = useState(0);

    const handleWolvesProperties = () => {
        requestAnimationFrame(() => {
            setWolfTop(window.innerWidth/ window.innerHeight  < 4/5 ? 70: 45);
            setWolfLeft(window.innerWidth/ window.innerHeight  < 4/5 ? 40: 15);
            setBigWolfWidth(dynamicSize(0.08));
            setSmallWolfWidth(dynamicSize(0.06));
            if (bigWolfRef.current) {
                const bigWolfRect = bigWolfRef.current.getBoundingClientRect();
                setSmallWolfLeft(bigWolfRect.left- bigWolfRect.width*0.5);
            }


        });


    }

    handleWolvesProperties();


    return (
        <div id={"wolvesArea"}>
            <img
                id="bigWolf"
                ref={bigWolfRef}
                src={wolf}
                style={{
                    position: "absolute",
                    minWidth: "90px",
                    top: `${wolfTop}%`,
                    left: `${wolfLeft}%`,
                    transform: "translate(-50%, -50%)",
                    width: `${bigWolfWidth}px`,
                    zIndex: "5",
                }}
            />
            <img
                id="smallWolf1"
                className={"smallWolves"}
                src={wolf}
                style={{
                    position: "absolute",
                    minWidth: "60px",
                    top: `${wolfTop - 4}%`,
                    left: `${smallWolfLeft}px`,
                    transform: "translate(-50%, -50%) scaleX(-1) rotate(-6deg)",
                    width: `${smallWolfWidth}px`,
                    zIndex: "19",
                }}
            />
            <img
                id="smallWolf2"
                className={"smallWolves"}
                src={wolf}
                style={{
                    position: "absolute",
                    minWidth: "60px",
                    top: `${wolfTop}%`,
                    left: `${smallWolfLeft}px`,
                    transform: "translate(-50%, -50%) scaleX(-1) rotate(0deg)",
                    width: `${smallWolfWidth}px`,
                    zIndex: "19",
                }}
            />
            <img
                id="smallWolf3"
                className={"smallWolves"}
                src={wolf}
                style={{
                    position: "absolute",
                    minWidth: "60px",
                    top: `${wolfTop + 6}%`,
                    left: `${smallWolfLeft + 20}px`,
                    transform: "translate(-50%, -50%) scaleX(-1) rotate(-1deg)",
                    width: `${smallWolfWidth}px`,
                    zIndex: "19",
                }}
            />


        </div>
    )
}

export default Wolves;