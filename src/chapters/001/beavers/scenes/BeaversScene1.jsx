import {useEffect, useState} from "react";
import "./beaver-scene1.css"

import beaverWithLog1 from "../assets/img/beaver_with_log/beaver-with-log1.svg"
import beaverWithLog2 from "../assets/img/beaver_with_log/beaver-with-log2.svg"
import dynamicSize from "../../../../functions/dynamicSize.js";
import sand from "../assets/img/sand.svg";
import {startAnimationInterval} from "../../../../functions/animationInternal.js";

const beaverWithLogAnimationArr = [beaverWithLog1, beaverWithLog2];


//BeaversScene1.jsx
const BeaversScene1 = (props) => {

    const [beaver1WithLogSrc, set1BeaverWithLogSrc] = useState(beaverWithLogAnimationArr[0]);
    const [beaverWidth, setBeaverWidth] = useState(0)

    const [beaver1WithLogIntervalId, setBeaver1WithLogIntervalId] = useState(null);


    useEffect(() => {
        startAnimationInterval(beaver1WithLogIntervalId, setBeaver1WithLogIntervalId, beaver1WithLogSrc, set1BeaverWithLogSrc, beaverWithLogAnimationArr)
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
                id="sand"
                src={sand}
                alt={"sand"}
                style={{
                    bottom: `${props.variables.inLessonProgress ? -20 : 0}%`,
                }}
            />

        </div>
    )
}

export default BeaversScene1