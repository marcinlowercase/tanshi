import tipi from "../assets/tipi.svg";
import {useState} from "react";

function Tipis() {

    const [tipiWidth, setTipiWidth] = useState(0)

    const handleTipiProperties = () => {
        requestAnimationFrame(() => {
            setTipiWidth(window.innerWidth/window.innerHeight <1 ?window.innerHeight*0.2 :window.innerWidth * 0.20);
        })
    }

    handleTipiProperties()

    return (
        <div>
            <img
                id="tipi1"
                src={tipi}
                style={{
                    width: `${tipiWidth}px`,
                    left: "0",
                    position: "absolute",
                    zIndex: "100",
                    bottom: "0",
                    transform: "scaleX(-1) translate(30%, 0)",
                }}
            />
            <img
                id="tipi2"
                src={tipi}
                style={{
                    width: `${tipiWidth*0.7}px`,
                    right: "0",
                    position: "absolute",
                    zIndex: "100",
                    bottom: "0",
                    transform: "scaleX(-1) translate(-50%, -50%)",
                }}
            />
        </div>
    )
}

export default Tipis;