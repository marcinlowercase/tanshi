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
  const [skyTop, setSkyTop] = useState(-window.innerHeight); // Initialize skyTop

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const calculateSkyTop = () => {
      if (skyRef.current) {
        const skyRect = skyRef.current.getBoundingClientRect();
        const skyHeight = skyRect.height;
        console.log("skyHeight: " + skyHeight);

        const newSkyTop = 0.15 * windowHeight - skyHeight;
        setSkyTop(newSkyTop);
      }
    };
    calculateSkyTop();
  }, [windowHeight, windowWidth, skyRef.current]);

  const calculateSkyTop = () => {
    // Use requestAnimationFrame to ensure the element is laid out
    requestAnimationFrame(() => {
      if (skyRef.current) {
        const skyRect = skyRef.current.getBoundingClientRect();
        const skyHeight = skyRect.height;
        const newSkyTop = 0.15 * windowHeight - skyHeight;
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
          top: `${skyTop}px`,
          width: "100%",
        }}
      />
    </div>
  );
}

export default ChapterOne;
