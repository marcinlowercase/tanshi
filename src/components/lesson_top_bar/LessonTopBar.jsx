import "./lesson-top-bar.css"

const LessonTopBar = (props) => {
    return (
        <div id={"lesson-top-bar"}>
            <button
                id={"lesson-back-button"}
                onClick={(e) => {
                    e.stopPropagation();  // Add this line
                    props.backToNormal();
                    console.log("Back button clicked");
                }}
            >
            </button>
            {props.inProgress && (
                <div id={"lesson-title-bar"}>
                    This is title for the current lesson
                </div>
            )}
        </div>
    )
}
export default LessonTopBar;