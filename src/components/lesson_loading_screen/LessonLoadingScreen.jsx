import React from 'react';

import "./lesson-loading-screen.css"
const LessonLoadingScreen = (props) => {
    return (
        <div
            id={`lesson-loading-screen`}
        >
               <div id="hello"> {props.text}</div>
        </div>
    );
};

export default LessonLoadingScreen;