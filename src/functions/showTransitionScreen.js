const showTransitionScreen = (transitionId, next, timeout) => {
    const transitionScreen = document.getElementById(transitionId);
    if (transitionScreen) {
        console.log("BLACK OUT")
        transitionScreen.style.opacity = "1";


        setTimeout(() => {
            next();
            console.log("BACK ")

            if (transitionScreen) transitionScreen.style.opacity = "0";

        }, timeout);
    }
}

export default showTransitionScreen;