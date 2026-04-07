const audio = new Audio("files/sounds/test_active.mp3");
const button = document.getElementById("myButton");

document.getElementById("myButton").onclick = function() {
    audio.play();
}