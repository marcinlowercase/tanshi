const dynamicSize = (percent, props) => {
  console.log("WIDTH AND HEIGHT" + props.windowHeight);
  return props.windowWidth / props.windowHeight > 16 / 9
    ? (percent * props.windowWidth) /
        ((props.windowWidth / props.windowHeight) * (9 / 16))
    : percent * props.windowWidth;
};

export default dynamicSize;
