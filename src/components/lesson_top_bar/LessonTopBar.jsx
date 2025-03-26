import "./lesson-top-bar.css"
import showTransitionScreen from "../../functions/showTransitionScreen.js";

const LessonTopBar = (props) => {

    const backToPreview = () => {
        // e.stopPropagation();  // Add this line
        if (props.variables.currentSceneNumber === 0) {
            props.functions.setCurrentSceneNumber(1);
            setTimeout(() => {
                props.functions.sceneZero();
                props.functions.backToNormal();
            }, 50);
        } else {
            props.functions.sceneZero();
            props.functions.backToNormal();

        }
    }

    const backToPreviewWithTransition = (e) => {
        if (props.variables.inLessonProgress) {
            showTransitionScreen(
                backToPreview
            )
        } else {
            backToPreview()
        }
    }

    return (
        <div id={"lesson-top-bar"}>
            <div
                id={"lesson-back-button"}
                onClick={backToPreviewWithTransition}
            >
            </div>
            {props.variables.inLessonProgress && (
                <>
                    <div id={"lesson-title-bar"}>
                        This is title for the current lesson
                    </div>
                    <div id={"process-indicator"}>
                        {props.variables.currentSceneNumber +1 } / {props.variables.numberOfScenes}

                    </div>
                </>
            )}
        </div>
    )
}
export default LessonTopBar;