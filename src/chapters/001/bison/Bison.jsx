import dynamicSize from "../../../functions/dynamicSize.js";
import {useEffect, useRef, useState} from "react";
import bison from "./assets/bison.svg";
import backgroundBush from "./assets/background_bush.svg";
import frontBush from "./assets/front_bush.svg";

function Bison(props) {


    const bisonRef = useRef(null);

    const [bisonBottom, setBisonBottom] = useState(0);
    const [bisonWidth, setBisonWidth] = useState(0);

    const [backgroundBushBottom, setBackgroundBushBottom] = useState(window.innerHeight);
    const [frontBushBottom, setFrontBushBottom] = useState(window.innerHeight);

    const handleBisonProperties = () => {
        requestAnimationFrame(() => {
            if (bisonRef.current && props.lakeTop != 0) {
                const bisonRect = bisonRef.current.getBoundingClientRect();

                // set bison bottom base on the screen ratio is vertical or horizontal
                setBisonBottom((window.innerWidth / window.innerHeight) > 1
                    ? window.innerHeight - props.lakeTop - bisonRect.height * 0.5
                    : window.innerHeight - props.lakeTop + bisonRect.height * 0.5);

                setBackgroundBushBottom(bisonBottom + bisonRect.height * 0.5);
                setFrontBushBottom(bisonBottom);

                setBisonWidth(dynamicSize(0.12));
            }
        })
    }

    handleBisonProperties();

    useEffect(() => {
        handleBisonProperties();

        const handleResize = () => {
            handleBisonProperties();
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])


    return (
        <div id={"bisonArea"}>
            <img
                draggable={false}
                src={bison}
                ref={bisonRef}
                alt="bison"
                id="bison"
                onLoad={handleBisonProperties}
                style={{
                    minWidth: "100px",
                    width: `${bisonWidth}px`,
                    bottom: `${bisonBottom}px`,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    zIndex: "50",
                }}

            />
            <img
                draggable={false}
                src={backgroundBush}
                alt="backgroundBush"
                style={{
                    minWidth: "100px",
                    width: `${bisonWidth}px`,
                    bottom: `${backgroundBushBottom}px`,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    zIndex: "10",
                }}

            />
            <img
                draggable={false}
                src={frontBush}
                alt="frontBush"
                style={{
                    minWidth: "100px",
                    width: `${bisonWidth}px`,
                    bottom: `${frontBushBottom}px`,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    zIndex: "100",
                }}
            />

        </div>
    )

}

export default Bison;
