
const stopLoader  = function (nodeId) {
    document.getElementById(nodeId).style.animation = "App-logo-stop"; // Code for Safari 4.0 - 8.0
}
const runLoader  = function (nodeId) {
    document.getElementById(nodeId).style.animation = "App-logo-spin infinite 20s linear"; // Code for Safari 4.0 - 8.0
}

export {stopLoader,runLoader}
