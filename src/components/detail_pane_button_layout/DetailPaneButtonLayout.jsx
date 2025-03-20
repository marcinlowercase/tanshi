// DetailPaneButtonLayout.jsx

import "./detail-pane-button-layout.css"
import previousSceneButtonSource from "./assets/img/previous-scene-button.webp"
import nextSceneButtonSource from "./assets/img/next-scene-button.webp"

import LessonTopBar from "../lesson_top_bar/LessonTopBar.jsx";


function DetailPaneButtonLayout(props) {

    // console.log(props.scenes[0]);
    return (
        <>



            {!props.variables.inProgress && (
                <div id={"meaning-buttons"}>
                    <button id={"cree-meaning-button"}>{props.variables.cree}</button>
                    <button id={"english-meaning-button"}>{props.variables.english}</button>
                </div>
            )}



            {props.variables.inProgress && (
                <div id={"bottom-pane-buttons-container"}>
                    <img
                        id={"previous-scene-button"}
                        src={previousSceneButtonSource}
                        alt={"Previous Scene Button"}
                    />
                    {/*<button id={"previous-scene-button"}></button>*/}
                    <div id={"content-container"}>
                        <div id={"cree-script"}>Cree Script should be showed here for every scene</div>
                        <div id={"english-script"}>English Script should be showed here for every scene</div>
                    </div>
                    <img
                        src={nextSceneButtonSource}
                        alt={"Next Scene Button"}
                        id={"next-scene-button"}
                    />
                </div>
            )}
        </>

    )
}

export default DetailPaneButtonLayout;