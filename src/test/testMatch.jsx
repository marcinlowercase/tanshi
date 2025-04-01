// DetailPaneButtonLayout.jsx

import "./detail-pane-button-layout.css"
import previousSceneButtonSource from "./assets/img/previous-scene-button.webp"
import nextSceneButtonSource from "./assets/img/next-scene-button.webp"

import LessonTopBar from "../lesson_top_bar/LessonTopBar.jsx";
import showTransitionScreen from "../../functions/showTransitionScreen.js";


function DetailPaneButtonLayout(props) {


    const nextSceneWithTransition = () => {
        showTransitionScreen("transition-screen", props.functions.nextScene, 600)
    }
    const previousSceneWithTransition = () => {
        showTransitionScreen("transition-screen", props.functions.previousScene, 600)
    }


    const currentScene = props.variables.questionOfScene[props.variables.currentSceneNumber];
    const [selectedOption, setSelectedOption] = useState(null);
    const optionsRef = useRef([]);

    useEffect(() => {
        optionsRef.current = optionsRef.current.slice(0, currentScene.options.length);
    }, [currentScene]);

    const handleClick = (index) => {
        if (selectedOption === index) {
            setSelectedOption(null);
        } else {
            setSelectedOption(index);
        }
    };



    return (
        <>

            {!props.variables.inLessonProgress && (
                <div id={"meaning-buttons"}>
                    <button
                        id={"cree-meaning-button"}
                        onClick={() => {
                            event.preventDefault();
                        }}
                    >
                        {props.variables.cree}
                    </button>
                    <button
                        id={"english-meaning-button"}
                        onClick={() => {
                            event.preventDefault();
                        }}
                    >
                        {props.variables.english}
                    </button>
                </div>
            )}


            {props.variables.inLessonProgress && (
                <div id={"bottom-pane-buttons-container"}>

                    <div
                        draggable={false}
                        id={"previous-scene-button"}
                        className={"unselectable special-character"}
                        onClick={props.functions.previousScene}
                        style={{
                            opacity: `${props.variables.currentSceneNumber === 0 ? 0 : 1}`,
                        }}
                    >
                        {/*←*/}⬅
                    </div>
                    {/*<button id={"previous-scene-button"}></button>*/}
                    <div id={"content-container"}>
                        {
                            !props.variables.onQuestion
                            &&
                            <div id={"content-container-scripts"}>
                                <div
                                    id={"cree-script"}
                                >
                                    {props.variables.scriptOfScene[props.variables.currentSceneNumber].cree}
                                </div>
                                <div
                                    id={"english-script"}
                                >
                                    {props.variables.scriptOfScene[props.variables.currentSceneNumber].english}
                                </div>
                            </div>
                        }


                        {
                            props.variables.onQuestion
                            &&
                            <div id="content-container-question-container">
                                <div id="content-container-question" style={{fontSize: "24px", marginBottom: "20px"}}>
                                    {currentScene.question.replace("___", <span className="blank" id="blank"></span>)}
                                </div>
                                <div id="content-container-options" style={{marginTop: "20px"}}>
                                    {currentScene.options.map((option, index) => (
                                        <div
                                            key={index}
                                            ref={(el) => (optionsRef.current[index] = el)}
                                            className="option"
                                            onClick={() => handleClick(index)}
                                            style={{
                                                display: "inline-block",
                                                padding: "10px 20px",
                                                background: selectedOption === index ? "#2ecc71" : "#3498db",
                                                color: "white",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                margin: "5px",
                                                transition: "transform 0.5s ease-in-out",
                                                transform: selectedOption === index ? "translateY(-50px)" : "translateY(0)",
                                            }}
                                        >
                                            {option.cree}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            && <div
                                id={'content-container-question-container'}
                            >
                                <div
                                    id={'content-container-question'}
                                >
                                    {props.variables.questionOfScene[props.variables.currentSceneNumber].question}
                                </div>
                                <div
                                    id={'content-container-options'}
                                >
                                    {/*<div>{props.variables.questionOfScene[props.variables.currentSceneNumber].options[0].cree}</div>*/}
                                    {/*<div>{props.variables.questionOfScene[props.variables.currentSceneNumber].options[1].cree}</div>*/}
                                    {props.variables.questionOfScene[props.variables.currentSceneNumber].options.map((option, index) => (
                                        <div key={index}>{option.cree}</div>
                                    ))}
                                </div>
                            </div>

                        }

                        <div id={"content-container-control-buttons"}>
                            {
                                !props.variables.onQuestion
                                &&
                                <div
                                    id={'again-button'}
                                    className={"unselectable special-character"}
                                >
                                    ↺
                                </div>
                            }
                            <div
                                id={"next-scene-button"}
                                className={"unselectable special-character"}
                                onClick={props.functions.nextScene}

                            >
                                {props.variables.onQuestion ? '✔' : '⮕'}
                            </div>

                        </div>


                    </div>
                    <div
                        draggable={false}
                    >
                        {/*Check*/}
                    </div>
                    <div id={"placeholder"}>
                    </div>
                </div>
            )}
        </>

    )
}

export default DetailPaneButtonLayout;