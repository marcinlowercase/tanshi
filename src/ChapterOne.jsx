import sky from "./assets/sky.svg";
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
  const [skyHeight, setSkyHeight] = useState(0); // Initialize skyHeight

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // recalculate the sky top after resize
  useEffect(() => {
    calculateSkyTop();
  }, [windowHeight, windowWidth]);

  // calculate the sky top on first load
  useEffect(() => {
    calculateSkyTop();
  });

  const calculateSkyTop = () => {
    // Use requestAnimationFrame to ensure the element is laid out
    requestAnimationFrame(() => {
      if (skyRef.current) {
        const skyRect = skyRef.current.getBoundingClientRect();
        // console.log(`Set sky height ${skyRect.height}`);
        setSkyHeight(skyRect.height);
        // const skyHeight = skyRect.height;
        const newSkyTop = 0.18 * windowHeight - skyHeight;

        setSkyTop(newSkyTop);
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
      <Sabe
        windowHeight={windowHeight}
        windowWidth={windowWidth}
        skyHeight={skyHeight}
      />
    </div>
  );
}

export default ChapterOne;
