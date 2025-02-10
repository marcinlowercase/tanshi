// DetailPaneButtonLayout.jsx

import "./detail-pane-button-layout.css"


function DetailPaneButtonLayout(props) {
    return (
        <>
            <button
                id={"backButton"}
                onClick={(e) => {
                    e.stopPropagation();  // Add this line
                    props.backToNormal();
                }}
            >
            </button>
            <div id={"meaningButtons"}>
                <button id={"creeMeaning"}>{props.cree}</button>
                <button id={"englishMeaning"}>{props.english}</button>
            </div>
        </>

    )
}

export default DetailPaneButtonLayout;