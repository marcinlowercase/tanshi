import cave from "./assets/cave.svg";

function Bear(props) {
  return (
    <img
      src={cave}
      style={{
        position: "absolute",
        width: `${props.windowWidth * 0.3}px`,
        zIndex: "10",
      }}
    />
  );
}

export default Bear;
