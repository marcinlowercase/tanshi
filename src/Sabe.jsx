import forestground from "./assets/forestground.svg";
import backgroundtree from "./assets/backgroundtree.png";
import sabe from "./assets/sabe.svg";
import fronttree from "./assets/fronttree.svg";
import { useState, useEffect, useRef } from "react";

function Sabe() {
  const sabeRef = useRef(null);
  const fronttreeRef = useRef(null);
  const [topPosition, setTopPosition] = useState(0); // Initialize to 0

  useEffect(() => {
    const updateTopPosition = () => {
      if (sabeRef.current) {
        const sabeRect = sabeRef.current.getBoundingClientRect();
        const fronttreeRect = fronttreeRef.current.getBoundingClientRect();

        //Get the top position of the sabe element
        const sabeTop = sabeRect.top;
        // console.log(sabeTop);
        //Get the height of the sabe element
        const sabeHeight = sabeRect.height;
        const fronttreeHeight = fronttreeRect.height;

        //Set the top position of the fronttree
        setTopPosition(sabeTop + sabeHeight - fronttreeHeight);
      }
    };

    //Initial calculation on mount
    updateTopPosition();

    //Add resize listener so it re-calculates when the window resizes
    window.addEventListener("resize", updateTopPosition);

    return () => window.removeEventListener("resize", updateTopPosition);
  }, []);

  return (
    <div id="sabearea">
      <img src={forestground} id="forestground"></img>
      <img src={backgroundtree} id="backgroundtree"></img>
      <img src={sabe} id="sabe" ref={sabeRef}></img>
      <img
        src={fronttree}
        id="fronttree"
        ref={fronttreeRef}
        style={{
          width: "8%",
          position: "absolute",
          zIndex: 31,
          left: 0,
          top: `${topPosition}px`,
        }}
      ></img>
    </div>
  );
}
export default Sabe;
