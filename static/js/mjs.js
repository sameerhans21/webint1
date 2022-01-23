var currentUser = null;
var atualLocation;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const date = new Date();

function CapturePhoto(event) {

    videoBubble.style.display = 'initial';
    videoBubble.play();
    event.preventDefault();
}

window.onload = function () {

    const myCamera = document.querySelector('#myCamera')
    const myCanvas = document.querySelector('#mycanvas');

    myCamera.onclick = function (event) {
        CapturePhoto(event)
    }

}
