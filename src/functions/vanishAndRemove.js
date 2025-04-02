
function vanishAndRemove(divID) {
    const element = document.getElementById(divID);
    if (!element) {
        return;
    }

    element.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
    element.style.animation = "boomEffect 0.5s ease-out forwards";

    setTimeout(() => {
        element.style.display = "none";
        element.remove();
    }, 1000);
}

export default vanishAndRemove;