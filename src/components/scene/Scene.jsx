import DetailPaneButtonLayout from "../detail_pane_button_layout/DetailPaneButtonLayout.jsx";
import LessonTopBar from "../lesson_top_bar/LessonTopBar.jsx";

const Scene = (props) => {
    const CurrentScene = props.scenes[0];
    return (
        <>
            {/* Blur overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 9998,
                animation: 'fadeInOverlay 0.3s ease-out',

            }} onClick={(e) => {
                e.stopPropagation();  // Add this line
                props.backToNormal();
            }}/>


            <div id={"popup"} style={{
                // TODO
                top: props.variables.popupDimension.top,
                left: props.variables.popupDimension.left,
                height: props.variables.popupDimension.height,
                width: props.variables.popupDimension.width,
                transform: "translate(-50%, -50%)",
                zIndex: 10000,
                position: "absolute",
                border: "3px solid #FFD700",
                borderRadius: "10px",
                minWidth: "700px",


            }}>

                <LessonTopBar
                    backToNormal={props.functions.backToNormal}
                    inProgress={props.variables.inProgress}
                />

                <CurrentScene
                    functions={props.functions}
                    variables={props.variables}
                />
                <DetailPaneButtonLayout
                    variables={props.variables}
                />

            </div>
        </>
    )
}

export default Scene;