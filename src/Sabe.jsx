import forestground from "./assets/forestground.svg";
import backgroundtree from "./assets/backgroundtree.png";
import sabe from "./assets/sabe.svg";
import fronttree from "./assets/fronttree.svg";
import { useState, useEffect, useRef } from "react";

import "./Sabe.css";

function Sabe(props) {
  const forestgroundRef = useRef(null); // Add ref for forestground
  const [forestgroundTop, setForestgroundTop] = useState(
    0.11 * props.windowHeight
  ); // State to store forestground top position

  const [backgroundtreeBottom, setBackgroundtreeBottom] = useState(
    props.windowHeight - forestgroundTop - 0
  );

  useEffect(() => {
    const handleImageLoad = () => {
      if (forestgroundRef.current) {
        const rect = forestgroundRef.current.getBoundingClientRect();
        console.log("rect.height " + rect.height);
        setBackgroundtreeBottom(
          props.windowHeight - forestgroundTop - rect.height
        );
      }

      console.log(backgroundtreeBottom);
    };

    console.log("update teh top on first load");

    handleImageLoad();
  }, []);

  useEffect(() => {
    const handleImageLoad = () => {
      if (forestgroundRef.current) {
        const rect = forestgroundRef.current.getBoundingClientRect();
        setForestgroundTop(0.11 * props.windowHeight);
        console.log(rect.height);
        let forestgroundHeight = rect.height;
        setBackgroundtreeBottom(
          props.windowHeight - forestgroundTop - forestgroundHeight
        );
      }
    };

    handleImageLoad();
  }, [props.windowHeight, props.windowWidth]);

  return (
    <div id="sabearea">
      <img
        src={forestground}
        id="forestground"
        ref={forestgroundRef} // Assign the ref
        style={{
          minWidth: "300px",
          position: "absolute",
          top: `${forestgroundTop}px`,
          width: `${0.4 * props.windowWidth}px`,
          zIndex: "0",
        }}
      />
      <img
        src={backgroundtree}
        style={{
          zIndex: "10",
          position: "absolute",
          width: `${0.25 * props.windowWidth}px`,
          bottom: `${backgroundtreeBottom}px`, // Dynamically calculate bottom position
          left: "0",
        }}
      />
    </div>
  );
}
export default Sabe;
