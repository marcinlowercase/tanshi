import DetailPaneButtonLayout from "../detail_pane_button_layout/DetailPaneButtonLayout.jsx";
import LessonTopBar from "../lesson_top_bar/LessonTopBar.jsx";


let currentSceneNumber = 0;

const Scene = (props) => {

    const nextScene = () => {
        if (currentSceneNumber < props.variables.numberOfScenes - 1) currentSceneNumber++;
        console.log(currentSceneNumber)
    }
    const prevScene = () => {
        if (currentSceneNumber > 0) currentSceneNumber--;
        console.log(currentSceneNumber)
    }

    const CurrentScene = props.scenes[currentSceneNumber];
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
                animation: `
                            glow 2s ease-in-out infinite,
                            fadeIn 0.3s ease-out
                        `,
                transformOrigin: 'center center',

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
                    variables={{
                        ...props.variables,
                        currentSceneNumber: currentSceneNumber,
                    }}
                    functions ={{
                        nextScene: nextScene,
                        prevScene: prevScene,
                    }}
                />

            </div>
        </>
    )
}

export default Scene;