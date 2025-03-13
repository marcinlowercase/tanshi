// DetailPaneButtonLayout.jsx

import "./detail-pane-button-layout.css"


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
                {/*<div id={"lesson-title-bar"}>*/}
                {/*    This is title for the current lesson*/}
                {/*</div>*/}
            </div>
            {!props.inProgress && (
                <div id={"meaning-buttons"}>
                    <button id={"cree-meaning-button"}>{props.cree}</button>
                    <button id={"english-meaning-button"}>{props.english}</button>
                </div>
            )}
        </>

    )
}

export default DetailPaneButtonLayout;