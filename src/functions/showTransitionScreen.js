const showTransitionScreen = (transitionId, next, timeout) => {
    const transitionScreen = document.getElementById(transitionId);
    if (transitionScreen) {
        transitionScreen.style.opacity = "1";


        setTimeout(() => {
            next();

            if (transitionScreen) transitionScreen.style.opacity = "0";

        }, timeout);
    }
}

export default showTransitionScreen;