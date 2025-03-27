import DetailPaneButtonLayout from "../detail_pane_button_layout/DetailPaneButtonLayout.jsx";
import LessonTopBar from "../lesson_top_bar/LessonTopBar.jsx";
import {useEffect, useState} from "react";
import {playAudio} from "../../functions/audioUtilities.js";
import showTransitionScreen from "../../functions/showTransitionScreen.js";


// let currentSceneNumber = 0;

const Scene = (props) => {

    const [isScene0AnimationRunning, setIsScene0AnimationRunning] = useState(false);

    const [onQuestion, setOnQuestion] = useState(false);

    const [currentSceneNumber, setCurrentSceneNumber] = useState(0);

    const sceneZero = () => {
        setCurrentSceneNumber(0);
    }

    const setCurrentSceneNumberToNextScene = () => {
        setCurrentSceneNumber(currentSceneNumber => currentSceneNumber + 1);
        setOnQuestion(false);
    }

    const nextScene = () => {
        if (onQuestion) {
            if (currentSceneNumber < props.variables.numberOfScenes - 1) {

                showTransitionScreen(setCurrentSceneNumberToNextScene);
            }
            // setCurrentSceneNumber(currentSceneNumber + 1);
        } else {
            setOnQuestion(true);
        }




    };

    const setCurrentSceneNumberToPreviousScene = () => {
        setCurrentSceneNumber(currentSceneNumber => currentSceneNumber - 1);
    }

    const previousScene = () => {
        if (currentSceneNumber > 0) {
            // setCurrentSceneNumber(currentSceneNumber - 1);
            showTransitionScreen(setCurrentSceneNumberToPreviousScene);
        }
    };
    for (const audio of props.variables.storyAudio) {
        audio.cree.current.load()
        audio.english.current.load()
    }


    const CurrentScene = props.scenes[currentSceneNumber];


    useEffect(() => {

        if (props.variables.inLessonProgress) {
            playAudio([props.variables.storyAudio[currentSceneNumber].cree]);
        }
    }, [props.variables.inLessonProgress, currentSceneNumber]);

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
                zIndex: 9999,
                animation: 'fadeInOverlay 0.3s ease-out',

            }} onClick={(e) => {
                e.stopPropagation();  // Add this line
                props.functions.backToNormal();
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
                    variables={{
                        ...props.variables,
                        currentSceneNumber: currentSceneNumber,
                    }}
                    functions={{
                        ...props.functions,
                        sceneZero: sceneZero,
                        setCurrentSceneNumber: setCurrentSceneNumber,
                    }}
                    // backToNormal={props.functions.backToNormal}
                    // inLessonProgress={props.variables.inLessonProgress}
                />

                <CurrentScene
                    functions={props.functions}
                    variables={{
                        ...props.variables,
                        currentSceneNumber: currentSceneNumber,
                    }}
                />
                <DetailPaneButtonLayout
                    variables={{
                        ...props.variables,
                        currentSceneNumber: currentSceneNumber,
                        onQuestion: onQuestion,
                    }}
                    functions ={{
                        nextScene: nextScene,
                        previousScene: previousScene,
                        setOnQuestion: setOnQuestion,
                    }}
                />

            </div>
        </>
    )
}

export default Scene;