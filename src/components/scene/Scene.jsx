import DetailPaneButtonLayout from "../detail_pane_button_layout/DetailPaneButtonLayout.jsx";
import LessonTopBar from "../lesson_top_bar/LessonTopBar.jsx";
import {useEffect, useRef, useState} from "react";
import {loadAudio, playAudio, stopAudio} from "../../functions/audioUtilities.js";
import showTransitionScreen from "../../functions/showTransitionScreen.js";


// let currentSceneNumber = 0;

const Scene = (props) => {

    const [backed, setBacked] = useState(false);

    const [nextButtonEnabled, setNextButtonEnabled] = useState(false);

    const enableNextButton = () => {
        setNextButtonEnabled(true);
        console.log("nextButtonEnabled", nextButtonEnabled);
    }
    const disableNextButton = () => {
        setNextButtonEnabled(false);
    }
    const [onQuestion, setOnQuestion] = useState(false);

    const [currentSceneNumber, setCurrentSceneNumber] = useState(0);

    const sceneZero = () => {
        stopCurrentAudio();
        setCurrentSceneNumber(0);
    }

    const setCurrentSceneNumberToNextScene = () => {
        setCurrentSceneNumber(currentSceneNumber => currentSceneNumber + 1);
        setOnQuestion(false);
        console.log("NEXTTT")
    }

    const nextScene = () => {
        if (onQuestion) {
            if (currentSceneNumber < props.variables.numberOfScenes - 1 && nextButtonEnabled) {
                stopCurrentAudio();

                showTransitionScreen(setCurrentSceneNumberToNextScene);
            }
            // setCurrentSceneNumber(currentSceneNumber + 1);
        } else {
            if (nextButtonEnabled) {
                setOnQuestion(true);
            }
        }


    };


    const setCurrentSceneNumberToPreviousScene = () => {
        setCurrentSceneNumber(currentSceneNumber => currentSceneNumber - 1);

    }

    const previousScene = () => {
        if (currentSceneNumber > 0) {
            setBacked(true);
            stopCurrentAudio();


            // setCurrentSceneNumber(currentSceneNumber - 1);
            showTransitionScreen(setCurrentSceneNumberToPreviousScene);
        }
    };
    // for (const audio of props.variables.storyAudio) {
    //     audio.cree.current.load()
    //     audio.english.current.load()
    // }


    const CurrentScene = props.scenes[currentSceneNumber];

    console.log("current", currentSceneNumber);
    console.log("total", props.variables.numberOfScenes - 1);


    const stillHaveNextScene = currentSceneNumber < props.variables.numberOfScenes;
    let currentSceneCreeAudio, currentSceneEnglishAudio
    // if (stillHaveNextScene) {
    //     currentSceneCreeAudio = useRef(new Audio(props.variables.content.audioURLOfScene[currentSceneNumber].cree));
    //     currentSceneEnglishAudio = useRef(new Audio(props.variables.content.audioURLOfScene[currentSceneNumber].english));
    // }

    currentSceneCreeAudio = useRef(new Audio(props.variables.content.audioURLOfScene[currentSceneNumber].cree));
    currentSceneEnglishAudio = useRef(new Audio(props.variables.content.audioURLOfScene[currentSceneNumber].english));

    const stopCurrentAudio = () => {
        stopAudio([currentSceneCreeAudio]);
        stopAudio([currentSceneEnglishAudio]);
    }

    const replayCurrentAudio = () => {
        stopCurrentAudio();
        playAudio({
            audioArray: [currentSceneCreeAudio],
            loop: false,
            nextAudio: [currentSceneEnglishAudio],
            callbackFunction: enableNextButton,
        })
    }

    useEffect(() => {

        disableNextButton();


        // play current scene audio
        if (props.variables.inLessonProgress) {
            loadAudio([
                {
                    audio: currentSceneCreeAudio,
                    audioURL: props.variables.content.audioURLOfScene[currentSceneNumber].cree
                },
                {
                    audio: currentSceneEnglishAudio,
                    audioURL: props.variables.content.audioURLOfScene[currentSceneNumber].english
                }
            ])
            playAudio({
                audioArray: [currentSceneCreeAudio],
                loop: false,
                nextAudio: [currentSceneEnglishAudio],
                callbackFunction: enableNextButton,
            })
        }



        // // load next scene audio
        // if (stillHaveNextScene) {
        //     loadAudio([
        //         {
        //             audio: currentSceneCreeAudio,
        //             audioURL: props.variables.content.audioURLOfScene[currentSceneNumber + 1].cree
        //         },
        //         {
        //             audio: currentSceneEnglishAudio,
        //             audioURL: props.variables.content.audioURLOfScene[currentSceneNumber + 1].english
        //         }
        //     ])
        // } else {
        //     loadAudio([
        //         {
        //             audio: currentSceneCreeAudio,
        //             audioURL: props.variables.content.audioURLOfScene[currentSceneNumber].cree
        //         },
        //         {
        //             audio: currentSceneEnglishAudio,
        //             audioURL: props.variables.content.audioURLOfScene[currentSceneNumber].english
        //         }
        //     ])
        // }
    }, [currentSceneNumber, props.variables.inLessonProgress]);

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
                    functions={{
                        ...props.functions,
                        enableNextButton: enableNextButton,
                    }}
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
                        nextButtonEnabled: nextButtonEnabled,
                    }}
                    functions={{
                        nextScene: nextScene,
                        previousScene: previousScene,
                        setOnQuestion: setOnQuestion,
                        replayCurrentAudio: replayCurrentAudio,
                    }}
                />

            </div>
        </>
    )
}

export default Scene;