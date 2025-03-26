import "./lesson-top-bar.css"

const LessonTopBar = (props) => {
    return (
        <div id={"lesson-top-bar"}>
            <button
                id={"lesson-back-button"}
                onClick={(e) => {
                    e.stopPropagation();  // Add this line
                    if (props.variables.currentSceneNumber === 0) {
                        props.functions.setCurrentSceneNumber(1);
                        setTimeout(()=> {
                            props.functions.sceneZero();
                            props.functions.backToNormal();
                        }, 50);
                    } else {
                        props.functions.sceneZero();
                        props.functions.backToNormal();
                    }
                    // props.functions.sceneZero();
                    // props.functions.backToNormal();
                    // console.log("Back button clicked");
                }}
            >
            </button>
            {props.variables.inLessonProgress && (
                <div id={"lesson-title-bar"}>
                    This is title for the current lesson
                </div>
            )}
        </div>
    )
}
export default LessonTopBar;