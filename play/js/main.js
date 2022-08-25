import Player from './Player.js';

$(function(){
    setCanvas();
    var config = {
        type: Phaser.AUTO,
        width: canvasWidth,
        height: canvasHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "Content",
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 },
                debug: true
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    var game = new Phaser.Game(config);            
});

function preload() {
    this.load.image('bg-s1-0', 'assets/bg/s1-0.png');
    this.load.image('bg-s1-1', 'assets/bg/s1-1.png');
    this.load.image('bg-s1-2', 'assets/bg/s1-2.png');
    this.load.image('bg-s1-3', 'assets/bg/s1-3.png');
    this.load.spritesheet('kuso', 'assets/kuso3d-act_v3.png', { frameWidth: 240, frameHeight: 320 });
}

const speed = 5;
var player;
var cursors;
var background;

function create(){
    //設定背景圖原始寬高
    let imageWidth = 1920, imageHeight = 1080;
    let scale = canvasHeight / imageHeight;
    console.log(scale);
    let posX = imageWidth * scale / 2;
    let posY = imageHeight * scale / 2;
    background = this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-0');
    background = this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-1');
    background = this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-2');
    background = this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-3');
    background.setScale(scale);    
    
    this.player = new Player(this, 200, 450, scale);

    //this.physics.add.collider(this.player.sprite, worldLayer);   
}

function update(time, delta){
    this.player.update();
}