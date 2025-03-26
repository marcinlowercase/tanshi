import {useEffect, useState} from "react";
import "./beaver-scene1.css"

import beaverWithLog1 from "../assets/img/beaver_with_log/beaver-with-log1.svg"
import beaverWithLog2 from "../assets/img/beaver_with_log/beaver-with-log2.svg"
import dynamicSize from "../../../../functions/dynamicSize.js";
import sand from "../assets/img/sand.svg";
import {startAnimationInterval} from "../../../../functions/animationInternal.js";
import log1 from "../assets/img/beaver_log/beaver-log1.svg";
import log2 from "../assets/img/beaver_log/beaver-log2.svg";
import log3 from "../assets/img/beaver_log/beaver-log3.svg";

const beaverWithLogAnimationArr = [beaverWithLog1, beaverWithLog2];
const logAnimationArr = [log1, log2, log3];


//BeaversScene1.jsx
const BeaversScene1 = (props) => {

    const [beaver1WithLogSrc, setBeaver1WithLogSrc] = useState(beaverWithLogAnimationArr[0]);
    const [beaver2WithLogSrc, setBeaver2WithLogSrc] = useState(beaverWithLogAnimationArr[0]);
    const [logSrc, setLogSrc] = useState(logAnimationArr[0]);

    const [beaverWidth, setBeaverWidth] = useState(0)

    const [beaver1WithLogIntervalId, setBeaver1WithLogIntervalId] = useState(null);
    const [beaver2WithLogIntervalId, setBeaver2WithLogIntervalId] = useState(null);
    const [logIntervalId, setLogIntervalId] = useState(null);


    useEffect(() => {
        startAnimationInterval(logIntervalId, setLogIntervalId, logSrc, setLogSrc, logAnimationArr, 200)
        startAnimationInterval(beaver1WithLogIntervalId, setBeaver1WithLogIntervalId, beaver1WithLogSrc, setBeaver1WithLogSrc, beaverWithLogAnimationArr, 700)
        startAnimationInterval(beaver2WithLogIntervalId, setBeaver2WithLogIntervalId, beaver2WithLogSrc, setBeaver2WithLogSrc, beaverWithLogAnimationArr, 650)
    },[])
    const handleBeaversProperties = () => {
        requestAnimationFrame(() => {
            setBeaverWidth(dynamicSize(0.08))
        })
    }
    handleBeaversProperties();

    return (
        <div
            id={"beaver-scene1"}

        >

            <img
                draggable={false}
                alt={"beaver 1 "}
                id={'scene1-beaver1'}
                src={beaver1WithLogSrc}
                style={{
                    width: `${beaverWidth}px`,
                }}
            />
            <img
                draggable={false}
                alt={"beaver 2 "}
                id={'scene1-beaver2'}
                src={beaver2WithLogSrc}
                style={{
                    width: `${beaverWidth}px`,
                }}
            />
            <img
                draggable={false}
                id="sand"
                src={sand}
                alt={"sand"}

            />
            <img
                id={"scene1-log"}
                draggable={false}
                src={logSrc}
                alt={"log"}

            />

        </div>
    )
}

export default BeaversScene1