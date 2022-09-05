const imageWidth = 1920, imageHeight = 1080;
var gameLevel = 0;
/*
0 - 荷之門   - s101~s102
1 - 木之門   - s201~s202
2 - 竹之門   - s301~s302
3 - 五瑞之門 - s401~s402
*/
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
    console.log('gameScale : ' + gameScale);
    //console.log(canvasWidth);
    //console.log(canvasHeight);
}

window.onload = function () {

};