import cave from "./assets/cave.svg";

function Bear(props) {
  return (
    <img
      src={cave}
      style={{
        minWidth: ``,
        position: "absolute",
        right: "0",
        width: `${props.windowWidth * 0.3}px`,
        zIndex: "10",
      }}
    />
  );
}

export default Bear;
