import { useState } from "react";
import sky from "./assets/sky.svg";
import cave from "./assets/cave.svg";
import lake from "./assets/lake.svg";
import forestground from "./assets/forestground.svg"
import mountains from "./assets/mountains.svg";
import "./ChapterOne.css";

function ChapterOne() {
  return (
    <>
      <img src={forestground} id="forestground"></img>
      <img src={sky} id="sky"></img>
      <img src={cave} id="cave"></img>
      <img src={lake} id="lake"></img>

      {/* <img src={mountains} id="mountains"></img> */}
    </>
  );
}

export default ChapterOne;
