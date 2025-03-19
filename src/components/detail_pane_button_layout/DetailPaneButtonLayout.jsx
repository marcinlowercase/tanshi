// DetailPaneButtonLayout.jsx

import "./detail-pane-button-layout.css"
import previousSceneButtonSource from "./assets/img/previous-scene-button.webp"
import nextSceneButtonSource from "./assets/img/next-scene-button.webp"

import LessonTopBar from "../lesson_top_bar/LessonTopBar.jsx";


function DetailPaneButtonLayout(props) {

    const CurrentScene = props.scenes[0];
    // console.log(props.scenes[0]);
    return (
        <>
            <div id={"popup"} style={{
                //TODO
                // top: props.popupDimension.top,
                // left: props.popupDimension.left,
                // height: props.popupDimension.height,
                // width: props.popupDimension.width,
                // transform: "translate(-50%, -50%)",
                // zIndex: 10000,

            }}>
                <CurrentScene
                    backToNormal={props.backToNormal}
                    popupDimension={props.popupDimension}
                    beaver1Src={props.beaver1Src}
                    beaver2Src={props.beaver2Src}
                    beaver1Style={props.beaver1Style}
                    beaver2Style={props.beaver2Style}
                    handleMouseEnterOnBeaver1={props.handleMouseEnterOnBeaver1}
                    handleMouseLeaveOnBeaver1={props.handleMouseLeaveOnBeaver1}
                    handleMouseEnterOnBeaver2={props.handleMouseEnterOnBeaver2}
                    handleMouseLeaveOnBeaver2={props.handleMouseLeaveOnBeaver2}
                    handleBeaverClick={props.handleBeaverClick}
                    sandTop={props.sandTop}
                    sandHeight={props.sandHeight}
                    sandRef={props.sandRef}
                    beaverWidth={props.beaverWidth}
                    showBeaverPane={props.showBeaverPane}
                    inProgress={props.inProgress}

                />
                {/*<LessonTopBar*/}
                {/*    backToNormal={props.backToNormal}*/}
                {/*    inProgress={props.inProgress}*/}
                {/*/>*/}

            </div>


            {!props.inProgress && (
                <div id={"meaning-buttons"}>
                    <button id={"cree-meaning-button"}>{props.cree}</button>
                    <button id={"english-meaning-button"}>{props.english}</button>
                </div>
            )}

            {props.inProgress && (
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