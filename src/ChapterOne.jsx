import { useState } from "react";
import sky from "./assets/sky.svg";
import cave from "./assets/cave.svg";
import mountains from "./assets/mountains.svg";
import "./ChapterOne.css";

function ChapterOne() {
  return (
    <>
      <img src={sky} id="sky"></img>
      <img src={cave} id="cave"></img>

      {/* <img src={mountains} id="mountains"></img> */}
    </>
  );
}

export default ChapterOne;
