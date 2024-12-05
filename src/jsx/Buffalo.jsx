import dynamicSize from "../functions/dynamicSize.js";
import {useEffect, useRef, useState} from "react";
import buffalo from "../assets/buffalo.svg";
import backgroundBush from "../assets/background_bush.svg";
import frontBush from "../assets/front_bush.svg";

function Turtles(props) {


    const buffaloRef = useRef(null);

    const [buffaloBottom, setBuffaloBottom] = useState(0);
    const [buffaloWidth, setBuffaloWidth] = useState(0);

    const [backgroundBushBottom, setBackgroundBushBottom] = useState(window.innerHeight);
    const [frontBushBottom, setFrontBushBottom] = useState(window.innerHeight);

    const handleBuffaloProperties = () => {
        requestAnimationFrame(() => {
            if (buffaloRef.current) {
                const buffaloRect = buffaloRef.current.getBoundingClientRect();

                // set buffalo bottom base on the screen ratio is vertical or horizontal
                setBuffaloBottom((window.innerWidth / window.innerHeight) > 1
                    ? window.innerHeight - props.lakeTop - buffaloRect.height * 0.5
                    : window.innerHeight - props.lakeTop + buffaloRect.height * 0.5);

                setBackgroundBushBottom(buffaloBottom + buffaloRect.height * 0.5);
                setFrontBushBottom(buffaloBottom );


                setBuffaloWidth(dynamicSize(0.12));
            }
        })
    }

    handleBuffaloProperties();

    useEffect(() => {
        handleBuffaloProperties();

        const handleResize = () => {
            handleBuffaloProperties();
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])


    return (
        <div id={"buffaloArea"}>
            <img
                src={buffalo}
                ref={buffaloRef}
                alt="buffalo"
                id="buffalo"
                style={{
                    minWidth: "100px",
                    width: `${buffaloWidth}px`,
                    bottom: `${buffaloBottom}px`,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    zIndex: "50",
                }}

            />
            <img
                src={backgroundBush}
                alt="backgroundBush"
                style={{
                    minWidth: "100px",
                    width: `${buffaloWidth}px`,
                    bottom: `${backgroundBushBottom}px`,
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    zIndex: "10",
                }}

            />
            <img
                src={frontBush}
                alt="frontBush"
                style={{
                    minWidth: "100px",
                    width: `${buffaloWidth}px`,
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

export default Turtles;
