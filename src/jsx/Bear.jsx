import cave from "../assets/cave.svg";
import bear from "../assets/bear.svg";
import dynamicSize from "../functions/dynamicSize.js";
import {useEffect, useRef, useState} from "react";

function Bear() {

    const caveRef = useRef();

    const [caveWidth, setCaveWidth] = useState(dynamicSize(0.3));
    const [caveBottom, setCaveBottom] = useState(0);
    const [caveRight, setCaveRight] = useState(0);
    const [bearRight, setBearRight] = useState(0);
    const [bearWidth, setBearWidth] = useState(0);
    const [bearBottom, setBearBottom] = useState(0);

    const handleBearSize = () => {
        requestAnimationFrame(() => {

            if(caveRef.current) {
                // Rect to get properties of cave
                const caveRect = caveRef.current.getBoundingClientRect();
                setCaveWidth(dynamicSize(0.38));
                setBearWidth(dynamicSize(0.12));

                setCaveRight(- 0.4 *caveRect.width);
                setCaveBottom(0.84*window.innerHeight - caveRect.height * 0.6);

                setBearRight(0.25*caveRect.width);
                setBearBottom(caveBottom+ caveRect.height*0.13);

            }

        })
    }

    // call handleBearSize on the first load
    handleBearSize();
    console.log("bearbear")

    // call handleBearSize everytim window resize
    useEffect(() => {
        handleBearSize();
        const handleResize = () => {
            handleBearSize();
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })


    return (
        <div className="bear">
            <img
                alt="cave"
                ref={caveRef}
                src={cave}
                style={{
                    bottom: `${caveBottom}px`,
                    minWidth: `200px`,
                    position: "absolute",
                    right: `${caveRight}px`,
                    width: `${caveWidth}px`,
                    zIndex: "10",
                }}
            />
            <img alt='bear'
            src={bear}
            style={{
                // ref: {bearRef},
                bottom: `${bearBottom}px`,
                minWidth: `100px`,
                position: "absolute",
                right: `${bearRight}px`,
                width: `${bearWidth}px`,
                zIndex: "30",
            }}/>
        </div>
    );
}

export default Bear;
