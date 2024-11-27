import sky from "./assets/sky.svg";
import cave from "./assets/cave.svg";
import lake from "./assets/lake.svg";
import { useState, useEffect, useRef } from "react";

import Sabe from "./Sabe";

import "./ChapterOne.css";

function ChapterOne() {
  const skyRef = useRef(null);
  // const [sabeTop, setSabeTop] = useState(0); //State to hold sabe's top position

  // useEffect(() => {
  //   const updateSabePosition = () => {
  //     if (skyRef.current) {
  //       const skyRect = skyRef.current.getBoundingClientRect();
  //       setSabeTop(skyRect.height); // Position Sabe below the sky
  //     }
  //   };

  //   updateSabePosition(); //Call immediately
  //   window.addEventListener("resize", updateSabePosition);
  //   return () => window.removeEventListener("resize", updateSabePosition);
  // }, []);

  return (
    <div>
      {" "}
      {/*Added a div to contain everything*/}
      <img src={sky} id="sky" ref={skyRef} />
      {/* <img src={cave} id="cave" />
      <img src={lake} id="lake" />
      <div style={{ position: "absolute", top: `${sabeTop}px`, left: 0 }}>
        <Sabe />
      </div> */}
    </div>
  );
}

export default ChapterOne;
