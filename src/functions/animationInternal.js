const handleMouseEnterAnimation = (intervalId, setIntervalId, imageSource, setImageSource, animationArr, timeout) => {
    console.log("MouseEnter");
    console.log(animationArr.length);
    let currentIndex = 1;
    const newIntervalId = setInterval(() => {
        setImageSource(animationArr[currentIndex]);
        currentIndex = currentIndex < animationArr.length - 1? currentIndex + 1 : 0;
        console.log("current Index", currentIndex);
    }, timeout);
    setIntervalId(newIntervalId);
}

const handleMouseLeaveAnimation = (intervalId, setImageSource, animationArr) => {
    console.log("MouseLeave");
    clearInterval(intervalId);
    setImageSource(animationArr[0]);
}

export {handleMouseEnterAnimation, handleMouseLeaveAnimation}