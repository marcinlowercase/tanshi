import eagle from '../assets/eagle.svg'
import dynamicSize from "../functions/dynamicSize.js";
import {useState} from "react";

function Eagle(props) {

    const [eagleWidth, setEagleWidth] = useState(0);

    const handleEagleProperties = () => {
        requestAnimationFrame(() => {
            setEagleWidth(dynamicSize(0.06));
        })
    }
    handleEagleProperties();

    return (
        <div id='eagleArea'>
            <img
                alt={"eagle"}
                src={eagle}
                id={"eagle"}
                style={{
                    left: "30%",
                    bottom: `${props.skyBottom+50}px`,
                    position: "absolute",
                    minWidth: "60px",
                    width: `${eagleWidth}px`,
                    zIndex: "1000000",
                }}
            />
        </div>
    )
}

export default Eagle