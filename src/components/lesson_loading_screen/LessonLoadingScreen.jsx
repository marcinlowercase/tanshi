import React from 'react';

import "./lesson-loading-screen.css"
const LessonLoadingScreen = (props) => {
    return (
        <div
            id={`lesson-loading-screen`}
        >
               <div id="lesson-loading-text"> {props.text}</div>
        </div>
    );
};

export default LessonLoadingScreen;