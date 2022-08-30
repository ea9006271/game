import Player from './Player.js';
import Scene2 from './scene2.js';

$(function(){
    setCanvas();
    var config = {
        type: Phaser.AUTO,
        width: canvasWidth,
        height: canvasHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        transparent: false,
        parent: "Content",
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    var game = new Phaser.Game(config);    
    game.scene.add('scenes', Scene2);        
});

function preload() {
    this.load.image('bg-s1-0', 'assets/bg/s1-0.png');
    this.load.image('bg-s1-1', 'assets/bg/s1-1.png');
    this.load.image('bg-s1-2', 'assets/bg/s1-2.png');
    this.load.image('bg-s1-3', 'assets/bg/s1-3.png');
    this.load.image('bg-s1-4', 'assets/bg/s1-4.png');

    this.load.image('btn0', 'assets/img/btn0.png');
    this.load.image('btnL0', 'assets/img/btnL0.png');
    this.load.image('btnL1', 'assets/img/btnL1.png');
    this.load.image('btnR0', 'assets/img/btnR0.png');
    this.load.image('btnR1', 'assets/img/btnR1.png');

    this.load.spritesheet('kuso', 'assets/kuso3d-act_v3.png', { frameWidth: 240, frameHeight: 320 });
    
    this.load.spritesheet('s1-001', 'assets/ani/s1-001.png', { frameWidth: 466, frameHeight: 454 });
    this.load.spritesheet('s1-002', 'assets/ani/s1-002.png', { frameWidth: 394, frameHeight: 868 });
    this.load.spritesheet('s1-003', 'assets/ani/s1-003.png', { frameWidth: 634, frameHeight: 1076 });
}

var player;
var btnL0, btnL1, btnR0, btnR1;
var cursors;
function create(){
    //設定背景圖原始寬高
    let imageWidth = 1920, imageHeight = 1080;
    let scale = canvasHeight / imageHeight;
    console.log(scale);
    let posX = imageWidth * scale / 2;
    let posY = imageHeight * scale / 2;

    this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-2').setScale(scale).setDepth(0);//背景
    this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-0').setScale(scale).setDepth(100);//前景
    this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-1').setScale(scale).setDepth(50);//中景
    this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-3').setScale(scale).setDepth(70);//地板
    this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-4').setScale(scale).setDepth(100);//光點

    let w = 352, h=162;
    this.add.tileSprite((w/2)*scale*1.5, ((imageHeight-h)/2)*scale, w, h,  'btn0').setScale(scale*1.5).setDepth(100);

    w = 59, h=81;
    btnL0 = this.add.tileSprite((w/2*2)*scale*1.5, ((imageHeight-162)/2)*scale, w, h, 'btnL0').setScale(scale*1.5).setDepth(100);
    btnL1 = this.add.tileSprite((w/2*2)*scale*1.5, ((imageHeight-162)/2)*scale, w, h, 'btnL1').setScale(scale*1.5).setDepth(100);
    btnR0 = this.add.tileSprite((w/2*2)*scale*5*1.5, ((imageHeight-162)/2)*scale, w, h, 'btnR0').setScale(scale*1.5).setDepth(100);
    btnR1 = this.add.tileSprite((w/2*2)*scale*5*1.5, ((imageHeight-162)/2)*scale, w, h, 'btnR1').setScale(scale*1.5).setDepth(100);
    btnL1.visible = false;
    btnR1.visible = false;

    btnR0.setInteractive({
        useHandCursor: true
    }).on('pointerover', () => btnRightOver())
      .on('pointerout', () => btnRightOut())
      .on('pointerdown', () => btnRightDown())
      .on('pointerup', () => btnRightUp());

    btnL0.setInteractive({
        useHandCursor: true
    }).on('pointerover', () => btnLeftOver())
      .on('pointerout', () => btnLeftOut())
      .on('pointerdown', () => btnLeftDown())
      .on('pointerup', () => btnLeftUp());

    var s1_001, s1_002, s1_003;
    s1_001 = this.physics.add.sprite((1920/3.3)*scale, (1080-(454/2))*scale, 's1-001');
    s1_001.setScale(scale).setDepth(55);
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('s1-001', { start: 0, end: 15 }),
        frameRate: 5,
        repeat: -1
    });
    s1_001.anims.play('idle', true);
    
    s1_002 = this.physics.add.sprite((394/2)*scale, (1080-(868/2))*scale, 's1-002');
    s1_002.setScale(scale).setDepth(55);
    this.anims.create({
        key: 'idle2',
        frames: this.anims.generateFrameNumbers('s1-002', { start: 0, end: 11 }),
        frameRate: 5,
        repeat: -1
    });
    s1_002.anims.play('idle2', true);

    s1_003 = this.physics.add.sprite((1920-(634/2))*scale, (1080-(1076/2))*scale, 's1-003');
    s1_003.setScale(scale).setDepth(55);
    this.anims.create({
        key: 'idle3',
        frames: this.anims.generateFrameNumbers('s1-003', { start: 0, end: 15 }),
        frameRate: 5,
        repeat: -1
    });
    s1_003.anims.play('idle3', true);

    player = new Player(this, scale);
    player.sprite.setDepth(80);

    //  Input Events
    //cursors = this.input.keyboard.createCursorKeys();    
    cursors = this.input.keyboard.addKeys({ 
        'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
        'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
        'A': Phaser.Input.Keyboard.KeyCodes.A,
        'D': Phaser.Input.Keyboard.KeyCodes.D
    });          

    this.input.keyboard.once('keydown-SPACE', () => {
        //fade to black
        //第1個參數是:毫秒
        //接下來3個參數為淡出的顏色:RGB
        this.cameras.main.fadeOut(1000, 0, 0, 0);
    });
    
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.time.delayedCall(1000, () => {
            this.scene.start('scene2');
        });        
    });
}

var btnRightOn = false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//console.log(isMobile);

function btnRightOver(){
    btnRightOn = true;
}
function btnRightOut(){
    btnRightOn = false;
    player.moveRight = false;
    btnR1.visible = false;
}
function btnRightDown(pointer){
    if(!isMobile){
        if(btnRightOn)
        {
            player.moveRight = true;
            btnR1.visible = true;
        }
        else{
            player.moveRight = false;
            btnR1.visible = false;
        }
    }
    else{
        player.moveRight = true;
        btnR1.visible = true;
    }
}
function btnRightUp(){
    //if(!isMobile)
    {
        player.moveRight = false;    
        btnR1.visible = false;
    }
}

var btnLeftOn = false;
function btnLeftOver(){
    btnLeftOn = true;
    btnL1.visible = false;
}
function btnLeftOut(){
    btnLeftOn = false;
    player.moveLeft = false;
    btnL1.visible = false;
}
function btnLeftDown(){
    if(!isMobile){
        if(btnLeftOn){
            player.moveLeft = true;
            btnL1.visible = true;
        }
        else{
            player.moveLeft = false;
            btnL1.visible = false;
        }
    }
    else{
        player.moveLeft = true;
        btnL1.visible = true;
    }
}
function btnLeftUp(){
    player.moveLeft = false;
    btnL1.visible = false;    
}
function update(time, delta){
    player.update();
    if (cursors.left.isDown || cursors.A.isDown){
        btnL1.visible = true;
    }
    else if(cursors.right.isDown || cursors.D.isDown){
        btnR1.visible = true;
    }
    else{
        if(!btnRightOn && !btnLeftOn){
            btnL1.visible = false;
            btnR1.visible = false;
        }

    }
}