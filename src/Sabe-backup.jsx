import forestground from "./assets/forestground.svg";
import backgroundtree from "./assets/backgroundtree.png";
import sabe from "./assets/sabe.svg";
import fronttree from "./assets/fronttree.svg";
import dynamicSize from "./functions/dynamicSize";
import { useState, useEffect, useRef } from "react";

import "./Sabe.css";

function Sabe(props) {
  const forestgroundRef = useRef(null); // Add ref for forestground
  const [forestgroundTop, setForestgroundTop] = useState(
    0.11 * props.windowHeight
  ); // State to store forestground top position

  const [backgroundtreeBottom, setBackgroundtreeBottom] = useState(0);
  const [backgroundtreeWidth, setBackgroundtreeWidth] = useState(0);
  const [sabeWidth, setSabeWidth] = useState(0);
  const [fronttreeWidth, setFronttreeWidth] = useState(0);
  const [forestgroundWidth, setForestgroundWidth] = useState(
    0.4 * props.windowWidth
  );

  const handleSabeSize = () => {
    requestAnimationFrame(() => {
      // Use requestAnimationFrame // To make sure that the image load before get the height
      if (forestgroundRef.current) {
        const forestgroundRect =
          forestgroundRef.current.getBoundingClientRect();
        setForestgroundTop(0.11 * props.windowHeight);
        console.log(
          JSON.stringify({
            windowHeight: props.windowHeight,
            forestgroundTop: forestgroundTop,
            forestgroundHeight: forestgroundRect.height,
          })
        );
        setBackgroundtreeWidth(dynamicSize(0.25, props));
        setForestgroundWidth(dynamicSize(0.4, props));
        setFronttreeWidth(dynamicSize(0.05, props));
        setSabeWidth(dynamicSize(0.1, props));
        setBackgroundtreeBottom(
          props.windowHeight - forestgroundTop - forestgroundRect.height * 0.6
        );
        console.log(backgroundtreeBottom + " this is background");
      }
    });
  };

  // // set sabe size on first load
  // useEffect(() => {
  //   handleSabeSize();
  // }, []);

    handleSabeSize();

  //   //set sabe size when resize the page
  // useEffect(() => {
  //   handleSabeSize();
  // }, [props.windowHeight, props.windowWidth]);



  return (
    <div id="sabearea">
      <img
        src={forestground}
        id="forestground"
        ref={forestgroundRef} // Assign the ref
        style={{
          minWidth: "300px",
          // minWidth: "900px",
          position: "absolute",
          // top: `${forestgroundTop}px`,
          bottom: `${backgroundtreeBottom - props.windowHeight * 0.03}px`, // Dynamically calculate bottom position
          // width: `${0.4 * props.windowWidth}px`,
          width: `${forestgroundWidth}px`,
          zIndex: "0",
        }}
      />
      <img
        src={backgroundtree}
        style={{
          zIndex: "10",
          position: "absolute",
          // minWidth: "450px",
          minWidth: "150px",
          width: `${backgroundtreeWidth}px`,
          // width: `${
          //   props.windowWidth / props.windowHeight > 16 / 9
          //     ? (0.25 * props.windowWidth) /
          //       ((props.windowWidth / props.windowHeight) * (9 / 16))
          //     : 0.25 * props.windowWidth
          // }px`,

          bottom: `${backgroundtreeBottom}px`, // Dynamically calculate bottom position
          left: "0",
        }}
      />

      <img
        src={sabe}
        style={{
          bottom: `${backgroundtreeBottom}px`,
          minWidth: "70px",
          position: "absolute",
          // width: `${0.1 * props.windowWidth}px`,
          width: `${sabeWidth}px`,
          zIndex: "30",
        }}
      />
      <img
        src={fronttree}
        style={{
          bottom: `${backgroundtreeBottom}px`,
          minWidth: "36px",
          position: "absolute",
          // width: `${0.05 * props.windowWidth}px`,
          width: `${fronttreeWidth}px`,

          zIndex: "50",
        }}
      />
    </div>
  );
}
export default Sabe;
