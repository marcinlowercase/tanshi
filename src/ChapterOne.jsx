import sky from "./assets/sky.svg";
// import mountains from "./assets/mountains.svg";
import cave from "./assets/cave.svg";
import lake from "./assets/lake.svg";
import { useState, useEffect, useRef } from "react";

import Sabe from "./Sabe";

import "./ChapterOne.css";

function ChapterOne() {
  // skyRef to get sky height
  const skyRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [skyTop, setSkyTop] = useState(0); // Initialize skyTop
  const [mountainsTop, setMountainsTop] = useState(0); // Initialize skyTop

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    calculateSkyTop();
  }, [windowHeight, windowWidth]);

  const calculateSkyTop = () => {
    // Use requestAnimationFrame to ensure the element is laid out
    requestAnimationFrame(() => {
      if (skyRef.current) {
        const skyRect = skyRef.current.getBoundingClientRect();
        const skyHeight = skyRect.height;
        const newSkyTop = 0.18 * windowHeight - skyHeight;

        setSkyTop(newSkyTop);
        setMountainsTop(0.11 * windowHeight);
      }
    });
  };

  useEffect(() => {
    calculateSkyTop(); //Initial Calculation
  }, [skyRef.current]);

  return (
    <div>
      <img
        src={sky}
        id="sky"
        ref={skyRef}
        style={{
          position: "absolute",
          zIndex: "5",
          top: `${skyTop}px`,
          width: "100%",
        }}
        alt={"sky"}
      />
      <Sabe windowHeight={windowHeight} windowWidth={windowWidth} />
      {/*<img src={mountains} id="mountains" style={{zIndex: "1", position: "fixed", top: `${mountainsTop}px`}}  alt={"mountains"}/>*/}
    </div>
  );
}

export default ChapterOne;
