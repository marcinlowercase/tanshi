const zoomOut = (paneId) => {
    const pane = document.getElementById(paneId);
    pane.style.width = "100%";
    pane.style.height = "100%";
    pane.style.top = "0px";
    pane.style.left = "0px";


    pane.style.border = "0px"
    pane.style.borderRadius = "0px";
    pane.style.transform = "";

}

const zoomIn = (paneId, originalDimension) => {
    const pane = document.getElementById(paneId);
    pane.style.width = originalDimension.width;
    pane.style.height = originalDimension.height;
    pane.style.top = originalDimension.top;
    pane.style.left = originalDimension.left;

    pane.style.border = "3px solid #FFD700"
    pane.style.borderRadius = "10px";
    pane.style.transform = "translate(-50%, -50%)";


}


export {zoomOut, zoomIn};