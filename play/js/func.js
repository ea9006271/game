var canvasWidth = 0, canvasHeight = 0;

function setCanvas(){
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var h2 = w * 0.5625;
    if(h2 > h){
        canvasHeight = h;
        canvasWidth = h * 1.78;
    }
    else{
        canvasWidth = w;
        canvasHeight = h2;
    }
    console.log(canvasWidth);
    console.log(canvasHeight);
}
window.onload = function () {
    
};