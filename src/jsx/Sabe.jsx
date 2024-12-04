import forestGround from "../assets/forest_ground.svg";
import backgroundTree from "../assets/background_tree.png";
import sabe from "../assets/sabe.svg";
import frontTree from "../assets/front_tree.svg";
import dynamicSize from "../functions/dynamicSize.js";
import {useState, useRef, useEffect} from "react";

import "../css/Sabe.css";

function Sabe() {
    const forestGroundRef = useRef(null); // Add ref for forestGround
    const [forestGroundTop, setForestGroundTop] = useState(
        0.11 * window.innerHeight
    );

    const [backgroundTreeBottom, setBackgroundTreeBottom] = useState(0);
    const [backgroundTreeWidth, setBackgroundTreeWidth] = useState(0);
    const [sabeWidth, setSabeWidth] = useState(0);
    const [frontTreeWidth, setFrontTreeWidth] = useState(0);
    const [forestGroundWidth, setForestGroundWidth] = useState(
        0.4 * window.innerWidth
    );


    // function to set the position and size for sabe component
    const handleSabeSize = () => {
        requestAnimationFrame(() => {
            // Use requestAnimationFrame // To make sure that the image load before get the height
            if (forestGroundRef.current) {
                // Rect to get the properties of forestGround
                const forestGroundRect =
                    forestGroundRef.current.getBoundingClientRect();
                setForestGroundTop(0.11 * window.innerHeight);

                setBackgroundTreeWidth(dynamicSize(0.25));
                setForestGroundWidth(dynamicSize(0.4));
                setFrontTreeWidth(dynamicSize(0.05));
                setSabeWidth(dynamicSize(0.1));
                setBackgroundTreeBottom(
                    window.innerHeight - forestGroundTop - forestGroundRect.height * 0.6
                );
            }
        });
    };

    // call handleSabeSize on the first load
    handleSabeSize();

    // call handleSabeSize everytime window resize
    useEffect(() => {
        handleSabeSize();
        const handleResize = () => {
            handleSabeSize();
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })


    return (
        <div id="sabearea">
            <img
                alt="forest ground"
                src={forestGround}
                id="forestground"
                ref={forestGroundRef} // Assign the ref
                style={{
                    minWidth: "300px",
                    position: "absolute",
                    bottom: `${backgroundTreeBottom - window.innerHeight * 0.03}px`, // Dynamically calculate bottom position
                    width: `${forestGroundWidth}px`,
                    zIndex: "0",
                }}
            />
            <img
                alt="background tree"
                src={backgroundTree}
                style={{
                    zIndex: "10",
                    position: "absolute",
                    minWidth: "150px",
                    width: `${backgroundTreeWidth}px`,
                    bottom: `${backgroundTreeBottom}px`, // Dynamically calculate bottom position
                    left: "0",
                }}
            />

            <img
                alt="sabe"
                src={sabe}
                style={{
                    bottom: `${backgroundTreeBottom}px`,
                    minWidth: "70px",
                    position: "absolute",
                    width: `${sabeWidth}px`,
                    zIndex: "30",
                }}
            />
            <img
                alt="front tree"
                src={frontTree}
                style={{
                    bottom: `${backgroundTreeBottom}px`,
                    minWidth: "36px",
                    position: "absolute",
                    width: `${frontTreeWidth}px`,
                    zIndex: "50",
                }}
            />
        </div>
    );
}

export default Sabe;
