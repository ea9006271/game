const imageWidth = 1920, imageHeight = 1080;
var gameLevel = 0;
var player;
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

function loadScene(scene, name){
    scene.physics.pause();//先暫停否則會連續觸發
    //fade to black
    //第1個參數是:毫秒
    //接下來3個參數為淡出的顏色:RGB
    scene.cameras.main.fadeOut(500, 0, 0, 0);

    scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        scene.time.delayedCall(0, () => {
            scene.scene.start(name);
        });        
    });      
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