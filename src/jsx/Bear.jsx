import cave from "../assets/cave.svg";
import dynamicSize from "../functions/dynamicSize.js";

function Bear() {


    return (
        <img
            src={cave}
            style={{
                bottom: ``,
                minWidth: ``,
                position: "absolute",
                right: "0",
                width: `${window.innerWidth * 0.3}px`,
                zIndex: "10",
            }}
        />
    );
}

export default Bear;
