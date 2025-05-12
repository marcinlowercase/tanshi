import React, {useState, useRef, useEffect} from "react";
import "./detail-pane-button-layout.css";

import variables from "../../functions/variables.js";

import showTransitionScreen from "../../functions/showTransitionScreen.js";
import {startDVDBounce, createDVD} from "../../functions/startDVDBounce.js";
import vanishAndRemove from "../../functions/vanishAndRemove.js";
import typeIn from "../../functions/typeIn.js";
import {loadAudio, playAudio} from "../../functions/audioUtilities.js";

function DetailPaneButtonLayout(props) {
    const {
        content,
        currentSceneNumber,
        inLessonProgress,
        onQuestion,
        questionComplete,
        cree,
        english,
    } = props.variables;


    // Prep Question
    const currentScene = content.questionOfScene[currentSceneNumber];

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTransform, setSelectedTransform] = useState({deltaX: 0, deltaY: 0});
    // This state will store the blank size to match the correct option.
    const [blankSize, setBlankSize] = useState({width: 200, height: 30});

    const optionsRef = useRef([]);
    const blankRef = useRef(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        setSelectedOption(null);
        props.functions.setOnQuestion(false);
    }, [currentSceneNumber])

    // Set up the isMounted flag for async safety
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (currentScene && currentScene.options) {
            optionsRef.current = optionsRef.current.slice(0, currentScene.options.length);
        }
    }, [currentScene]);

    // When the question is shown, find the correct answer option and update blank dimensions.
    useEffect(() => {
        if (onQuestion && currentScene && currentScene.options) {
            const correctIndex = currentScene.options.findIndex((opt) => opt.correct === true);
            if (correctIndex !== -1 && optionsRef.current[correctIndex]) {
                const rect = optionsRef.current[correctIndex].getBoundingClientRect();
                setBlankSize({width: rect.width, height: rect.height});
            }
        }
    }, [onQuestion, currentScene]);


    const handleClick = (index, option) => {
        if (selectedOption === index) {
            setSelectedOption(null);
        } else {

            if (option.correct === true) {
                let zoom = 1;


                const correctAudioURL = new URL('./assets/audio/correct.m4a', import.meta.url).href
                const correctAudio = new Audio(correctAudioURL);

                correctAudio.loop = false;
                correctAudio.currentTime = 0;
                correctAudio.play();

                createDVD("current-correct-option", option.cree, zoom);


                const showNextButton = () => {
                    props.functions.setQuestionComplete(true);
                }
                const acceptAnswer = () => {

                    vanishAndRemove("current-correct-option")
                    typeIn(option.cree, "blank", 200, showNextButton);
                }

                startDVDBounce("current-correct-option", 100, 100, 1, zoom, props.variables.currentSceneHighlightAudio, acceptAnswer);
                document.getElementById("content-container-options").style.opacity = '0';
                setTimeout(() => {
                    document.getElementById("content-container-options").style.display = 'none';
                }, 300)


            } else {
                const incorrectAudioURL = new URL('./assets/audio/incorrect.m4a', import.meta.url).href
                const incorrectAudio = new Audio(incorrectAudioURL);

                incorrectAudio.loop = false;
                incorrectAudio.currentTime = 0;
                incorrectAudio.play();
                //play wrong animation
                // document.getElementById(`option-${index}`).style.display = 'none';
            }
            vanishAndRemove(`option-${index}`)


            setSelectedOption(index);
        }
    };

    const nextSceneWithTransition = () => {

        props.functions.nextScene();


    };
    const previousSceneWithTransition = () => {
        props.functions.previousScene();


    };

    // Split the question by the "___" marker to insert the blank element.
    const questionParts = currentScene.question.split("___");

    // Prep Script
    // const creeRawScript = content.scriptOfScene[currentSceneNumber].cree
    // const creeScriptArr = creeRawScript.split("****");
    // const creeHighlight = creeScriptArr[1];

    // const englishRawScript = content.scriptOfScene[currentSceneNumber].english
    // const englishScriptArr = englishRawScript.split("****");
    // const englishHighlight = englishScriptArr[1];

    return (
        <>
            {!inLessonProgress && (
                <div id="meaning-buttons">
                    <button
                        id="cree-meaning-button"
                        className="button"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {cree}
                    </button>
                    <button
                        id="english-meaning-button"
                        className="button"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {english}
                    </button>
                </div>
            )}

            {inLessonProgress && (
                <div id="bottom-pane-buttons-container">
                    <div
                        draggable={false}
                        id="previous-scene-button"
                        className="unselectable special-character button"
                        onClick={previousSceneWithTransition}
                        style={{
                            opacity: `${currentSceneNumber === 0 ? 0 : 1}`,
                        }}
                    >
                        ⬅
                    </div>

                    <div id="content-container">
                        {!onQuestion && (

                            <div id="content-container-scripts">
                                <div
                                    id={"cree-script"}
                                    style={{
                                        backgroundColor: props.variables.playingEnglish ? variables.colorSabeBrown : variables.colorTreeBarkBrown,
                                        color: props.variables.playingEnglish ? variables.colorTreeBarkBrown : "white",
                                    }}
                                >
                                    {content.scriptOfScene[currentSceneNumber].cree.map((item, index, arr) => (
                                        <span>
                                            <span
                                                key={index}
                                                data-timestamp={item.timestamp}
                                                className={item.keyword ? "content-keyword" : ""}
                                            >
                                                {item.word}

                                            </span>
                                            {index !== arr.length - 1 && " "}
                                        </span>
                                    ))}
                                </div>
                                <div
                                    id={"english-script"}
                                    style={{
                                        backgroundColor: props.variables.playingEnglish ? variables.colorTreeBarkBrown : variables.colorSabeBrown,
                                        color: props.variables.playingEnglish ? "white" : variables.colorTreeBarkBrown,
                                    }}
                                >
                                    {content.scriptOfScene[currentSceneNumber].english.map((item, index, arr) => (
                                        <span>
                                            <span
                                                key={index}
                                                data-timestamp={item.timestamp}
                                                className={item.keyword ? "content-keyword" : ""}
                                            >
                                                {item.word}

                                            </span>
                                            {index !== arr.length - 1 && " "}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {onQuestion && (
                            <div id="content-container-question-container">

                                {/*<div*/}
                                {/*    id="cree-script"*/}
                                {/*    style={{*/}
                                {/*        backgroundColor: "transparent",*/}
                                {/*        color: "white",*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    {creeScriptArr[0]}*/}
                                {/*    <span*/}
                                {/*        style={{*/}
                                {/*            backgroundColor: 'rgba(255, 255, 255, 0.3)',*/}
                                {/*            borderRadius: variables.borderRadiusButton,*/}
                                {/*            padding: variables.spaceSmall*/}
                                {/*        }}>*/}
                                {/*        {creeHighlight}*/}
                                {/*    </span>*/}
                                {/*    {creeScriptArr[2]}*/}
                                {/*</div>*/}


                                <div
                                    id="content-container-question"

                                >
                                    {content.scriptOfScene[currentSceneNumber].english.map((item, index, arr) => {
                                        if (item.keyword) {
                                            return (
                                                <span
                                                    className="blank content-keyword"
                                                    id="blank"
                                                    key={index}
                                                    data-timestamp={item.timestamp}
                                                    ref={blankRef}
                                                    style={{
                                                        display: "inline-block",
                                                        width: `${blankSize.width}px`,
                                                        verticalAlign: "middle",
                                                        textAlign: "center",
                                                    }}
                                                ></span>
                                            )
                                        } else {
                                            return (

                                                <span
                                                    key={index}
                                                    data-timestamp={item.timestamp}
                                                >
                                                    {item.word}
                                                    {index !== arr.length - 1 && " "}
                                                </span>
                                            )
                                        }
                                    })}
                                </div>

                                {/*<div id="content-container-question">*/}
                                {/*    {questionParts[0]}*/}
                                {/*    /!* Blank span with dynamic width/height matching the correct answer *!/*/}
                                {/*    <span*/}
                                {/*        className="blank"*/}
                                {/*        id="blank"*/}
                                {/*        ref={blankRef}*/}
                                {/*        style={{*/}
                                {/*            display: "inline-block",*/}
                                {/*            width: `${blankSize.width}px`,*/}
                                {/*            verticalAlign: "middle",*/}
                                {/*            textAlign: "center",*/}
                                {/*        }}*/}
                                {/*    ></span>*/}
                                {/*    {questionParts[1] || ""}*/}
                                {/*</div>*/}

                                <div
                                    id="content-container-options"
                                    style={{marginTop: "20px", position: "relative"}}
                                >
                                    {currentScene.options.map((option, index) => (
                                        <div
                                            // id={`${option.correct ? "current-correct-option": "current-incorrect-option"}`}
                                            id={`option-${index}`}
                                            key={index}
                                            ref={(el) => (optionsRef.current[index] = el)}
                                            className={"option button"}
                                            onClick={() =>
                                                handleClick(index, option)
                                            }
                                            style={{
                                                display: "inline-block",
                                                background: selectedOption === index ? variables.colorMediumGreen : variables.colorMediumGreen,
                                                boxShadow: "border-box",
                                                color: "white",
                                                cursor: "pointer",
                                                transition: "transform 0.5s ease-in-out",
                                                transform:
                                                    selectedOption === index
                                                        ? `translate(${selectedTransform.deltaX}px, ${selectedTransform.deltaY}px)`
                                                        : "translate(0, 0)",
                                                position: selectedOption === index ? "absolute" : "relative",
                                                zIndex: selectedOption === index ? 1000 : "auto",
                                            }}
                                        >
                                            {option.cree}
                                            <div
                                                style={{
                                                    color: "darkgray",
                                                    fontSize: "1rem",
                                                }}>
                                                {option.english}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div id="content-container-control-buttons">
                            <div
                                id="again-button"
                                className="unselectable special-character button"
                                style={{
                                    backgroundColor: variables.colorSandyBrown,
                                }}
                                onClick={props.functions.replayCurrentAudio}
                            >
                                ↺
                            </div>
                            {(!onQuestion || questionComplete) && (
                                <div
                                    id="next-scene-button"
                                    className="unselectable special-character button"
                                    onClick={onQuestion ? nextSceneWithTransition : props.functions.nextScene}
                                    style={{
                                        cursor: props.variables.nextButtonEnabled ? "pointer" : "progress",
                                        backgroundColor: props.variables.nextButtonEnabled ? variables.colorMediumGreen : variables.colorDeepGreen,
                                    }}
                                >
                                    {/*{onQuestion ? "✔" : "⮕"}*/}
                                    {"⮕"}
                                </div>)
                            }
                        </div>
                    </div>
                    <div draggable={false}>{/* Additional content or controls */}</div>
                    <div id="placeholder"></div>
                </div>
            )}
        </>
    );
}

export default DetailPaneButtonLayout;
