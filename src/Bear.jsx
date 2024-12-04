import cave from "./assets/cave.svg";

function Bear(props) {
  return (
    <img
      src={cave}
      style={{
        position: "absolute",
        zIndex: "10",
      }}
    />
  );
}

export default Bear;
