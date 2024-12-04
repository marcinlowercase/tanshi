import forestGround from "./assets/forest_ground.svg";
import backgroundTree from "./assets/background_tree.png";
import sabe from "./assets/sabe.svg";
import frontTree from "./assets/front_tree.svg";
import dynamicSize from "./functions/dynamicSize";
import {useState, useRef} from "react";

import "./Sabe.css";

function Sabe(props) {
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

    const handleSabeSize = () => {
        requestAnimationFrame(() => {
            // Use requestAnimationFrame // To make sure that the image load before get the height
            if (forestGroundRef.current) {
                const forestGroundRect =
                    forestGroundRef.current.getBoundingClientRect();
                setForestGroundTop(0.11 * window.innerHeight);

                setBackgroundTreeWidth(dynamicSize(0.25, props));
                setForestGroundWidth(dynamicSize(0.4, props));
                setFrontTreeWidth(dynamicSize(0.05, props));
                setSabeWidth(dynamicSize(0.1, props));
                setBackgroundTreeBottom(
                    window.innerHeight - forestGroundTop - forestGroundRect.height * 0.6
                );
                console.log(backgroundTreeBottom + " this is background");
            }
        });
    };

    handleSabeSize();

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
