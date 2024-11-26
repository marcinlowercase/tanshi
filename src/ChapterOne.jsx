import { useState } from "react";
import sky from "./assets/sky.svg";
import cave from "./assets/cave.svg";
import lake from "./assets/lake.svg";

import Sabe from "./Sabe";

import "./ChapterOne.css";

function ChapterOne() {
  return (
    <>
      <img src={sky} id="sky"></img>
      <img src={cave} id="cave"></img>
      <img src={lake} id="lake"></img>
      <Sabe></Sabe>
    </>
  );
}

export default ChapterOne;
