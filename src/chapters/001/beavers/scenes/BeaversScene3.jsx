//BeaversScene3.jsx
import {useEffect, useState} from "react";
import {startAnimationInterval} from "../../../../functions/animationInternal.js";
import dynamicSize from "../../../../functions/dynamicSize.js";
import log1 from "../assets/img/beaver_log/beaver-log1.svg";
import log2 from "../assets/img/beaver_log/beaver-log2.svg";
import log3 from "../assets/img/beaver_log/beaver-log3.svg";

import beaverWithRockSrc from  "../assets/img/beaver_with_rock/beaver-with-rock.svg"
import beaverWithLogSrc from "../assets/img/beaver_with_rock/beaver-with-log.svg"
import damSrc from "../assets/img/dam.svg";
const logAnimationArr = [log1, log2, log3];
import "./beaver-scene3.css"
const BeaversScene3 = () => {


    const [logSrc, setLogSrc] = useState(logAnimationArr[0]);

    const [beaverWidth, setBeaverWidth] = useState(0)


    const [logIntervalId, setLogIntervalId] = useState(null);


    useEffect(() => {
        startAnimationInterval(logIntervalId, setLogIntervalId, logSrc, setLogSrc, logAnimationArr, 200)

    },[])
    const handleBeaversProperties = () => {
        requestAnimationFrame(() => {
            setBeaverWidth(dynamicSize(0.2))
        })
    }
    handleBeaversProperties();

    return (
        <div
            id={"beaver-scene2"}

        >

            <img
                id={"scene3-beaver-with-log"}
                draggable={false}
                src={beaverWithLogSrc}
                width={beaverWidth}
            />
            <img
                id={"scene3-beaver-with-rock"}
                draggable={false}
                src={beaverWithRockSrc}
                width={beaverWidth}
            />
            <img
                id={"dam"}
                draggable={false}
                src={damSrc}

                />


            {/*<img*/}
            {/*    id={"scene1-log"}*/}
            {/*    draggable={false}*/}
            {/*    src={logSrc}*/}
            {/*    alt={"log"}*/}

            {/*/>*/}

        </div>
    )
}

export default BeaversScene3