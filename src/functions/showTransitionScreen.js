const showTransitionScreen = (next) => {
    const transitionScreen = document.getElementById("transition-screen");
    if (transitionScreen) {
        console.log("BLACK OUT")
        transitionScreen.style.opacity = "1";


        setTimeout(() => {
            next();
            console.log("BACK ")

            if (transitionScreen) transitionScreen.style.opacity = "0";

        }, 600);
    }
}

export default showTransitionScreen;