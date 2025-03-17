// DetailPaneButtonLayout.jsx

import "./detail-pane-button-layout.css"
import previousSceneButtonSource from "./assets/img/previous-scene-button.webp"
import nextSceneButtonSource from "./assets/img/next-scene-button.webp"


function DetailPaneButtonLayout(props) {
    return (
        <>
            <div id={"top-pane-button-container"}>
                <button
                    id={"lesson-back-button"}
                    onClick={(e) => {
                        e.stopPropagation();  // Add this line
                        props.backToNormal();
                    }}
                >
                </button>
                {props.inProgress && (
                    <div id={"lesson-title-bar"}>
                        This is title for the current lesson
                    </div>
                )}
            </div>
            {!props.inProgress && (
                <div id={"meaning-buttons"}>
                    <button id={"cree-meaning-button"}>{props.cree}</button>
                    <button id={"english-meaning-button"}>{props.english}</button>
                </div>
            )}

            {props.inProgress && (
                <div id={"bottom-pane-buttons-container"}>
                    <img id={"previous-scene-button"} src={previousSceneButtonSource} alt={"Previous Scene Button"}
                         style={{}}/>
                    {/*<button id={"previous-scene-button"}></button>*/}
                    <div id={"content-container"}>
                        <div id={"cree-script"}>Cree Script should be showed here for every scene</div>
                        <div id={"english-script"}>English Script should be showed here for every scene</div>
                    </div>
                    <img src={nextSceneButtonSource} alt={"Next Scene Button"} id={"next-scene-button"}/>
                </div>
            )}
        </>

    )
}

export default DetailPaneButtonLayout;