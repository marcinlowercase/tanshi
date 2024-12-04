// function to get dynamic size of the component base on screen ratio
const dynamicSize = (percent) => {
  return window.innerWidth / window.innerHeight > 16 / 9
    ? (percent * window.innerWidth) /
        ((window.innerWidth / window.innerHeight) * (9 / 16))
    : percent * window.innerWidth;
};

export default dynamicSize;
