const startAnimationInterval = (intervalId, setIntervalId, imageSource, setImageSource, animationArr, timeout) => {
    let currentIndex = 1;
    const newIntervalId = setInterval(() => {
        setImageSource(animationArr[currentIndex]);
        currentIndex = currentIndex < animationArr.length - 1 ? currentIndex + 1 : 0;
    }, timeout);
    setIntervalId(newIntervalId);

}

const stopAnimationInterval = (intervalId, setIntervalId, setImageSource, animationArr) => {
    clearInterval(intervalId);
    setImageSource(animationArr[0]);
    setIntervalId(null);
}

export {startAnimationInterval, stopAnimationInterval}