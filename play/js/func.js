const imageWidth = 1920, imageHeight = 1080;
var canvasWidth = 0, canvasHeight = 0;
var gameScale = 0;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var speed = 175;
if(!isMobile){
    speed*=1.5;
}

function setCanvas() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var h2 = w * 0.5625;
    if (h2 > h) {
        canvasHeight = h;
        canvasWidth = h * 1.78;
    }
    else {
        canvasWidth = w;
        canvasHeight = h2;
    }
    gameScale = canvasHeight / imageHeight;
    //console.log(canvasWidth);
    //console.log(canvasHeight);
}

window.onload = function () {

};