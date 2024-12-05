import dynamicSize from "../functions/dynamicSize.js";
import {useEffect, useRef, useState} from "react";
import turtles from "../assets/turtles.svg";

function Turtles() {
    const [turtlesWidth, setTurtlesWidth] = useState(0);

    const handleTurtlesProperties = () => {
        requestAnimationFrame(() => {
            setTurtlesWidth(dynamicSize(0.1));
        })
    }

    handleTurtlesProperties();

    // call handlerTurtlesProperties everytime window resize
    useEffect(() => {
        handleTurtlesProperties();
        const handleResize = () => {
            handleTurtlesProperties();
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })


    return (
        <img src={turtles} alt="turtles" id="turtles" style={{
            minWidth: "100px",
            width: `${turtlesWidth}px`,
            top: "50%",
            left: "35%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            zIndex: "50",
        }}/>
    )

}

export default Turtles;
