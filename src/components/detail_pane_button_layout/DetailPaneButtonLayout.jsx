import React, {useState, useRef, useEffect} from "react";
import "./detail-pane-button-layout.css";

import variables from "../../functions/variables.js";

import showTransitionScreen from "../../functions/showTransitionScreen.js";

function DetailPaneButtonLayout(props) {
    const {
        content,
        currentSceneNumber,
        inLessonProgress,
        onQuestion,
        cree,
        english,
    } = props.variables;

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

    const handleClick = (index) => {
        if (selectedOption === index) {
            setSelectedOption(null);
        } else {
            if (blankRef.current && optionsRef.current[index]) {
                const blankRect = blankRef.current.getBoundingClientRect();
                const optionRect = optionsRef.current[index].getBoundingClientRect();
                const deltaX = blankRect.left - optionRect.left + (blankRect.width / 2 - optionRect.width / 2);
                const deltaY = blankRect.top - optionRect.top;
                setSelectedTransform({deltaX, deltaY});
            }
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
                        className="unselectable special-character"
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
                                <div id="cree-script">
                                    {content.scriptOfScene[currentSceneNumber].cree}
                                </div>
                                <div id="english-script">
                                    {content.scriptOfScene[currentSceneNumber].english}
                                </div>
                            </div>
                        )}

                        {onQuestion && (
                            <div id="content-container-question-container">
                                <div id="content-container-question">
                                    {questionParts[0]}
                                    {/* Blank span with dynamic width/height matching the correct answer */}
                                    <span
                                        className="blank"
                                        id="blank"
                                        ref={blankRef}
                                        style={{
                                            display: "inline-block",
                                            width: `${blankSize.width}px`,
                                            height: `${blankSize.height}px`,
                                            verticalAlign: "middle",
                                            textAlign: "center",
                                        }}
                                    ></span>
                                    {questionParts[1] || ""}
                                </div>
                                <div
                                    id="content-container-options"
                                    style={{marginTop: "20px", position: "relative"}}
                                >
                                    {currentScene.options.map((option, index) => (
                                        <div
                                            key={index}
                                            ref={(el) => (optionsRef.current[index] = el)}
                                            className="option"
                                            onClick={() => handleClick(index)}
                                            style={{
                                                display: "inline-block",
                                                background: selectedOption === index ? variables.colorMediumGreen : variables.colorDeepGreen,
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div id="content-container-control-buttons">
                            {!onQuestion && (
                                <div
                                    id="again-button"
                                     className="unselectable special-character button"
                                    style={ {
                                        backgroundColor: variables.colorSandyBrown,
                                    }}
                                >
                                    ↺
                                </div>
                            )}
                            <div
                                id="next-scene-button"
                                className="unselectable special-character button"
                                onClick={onQuestion ? nextSceneWithTransition : props.functions.nextScene}
                                style={{
                                    cursor: props.variables.nextButtonEnabled ? "pointer" : "progress",
                                    backgroundColor: props.variables.nextButtonEnabled ? variables.colorMediumGreen: variables.colorDeepGreen,
                                }}
                            >
                                {onQuestion ? "✔" : "⮕"}
                            </div>
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
