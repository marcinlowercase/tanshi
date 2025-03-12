const zoomOut = (paneId) => {
    const pane = document.getElementById(paneId);
    pane.style.width = "100%";
    pane.style.height = "100%";
    pane.style.top = "0px";
    pane.style.left = "0px";
    pane.style.transform = "";
    pane.style.border = "0px"
    pane.style.borderRadius = "0px";

}


export default zoomOut;