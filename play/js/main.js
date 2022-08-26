import Player from './Player.js';

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
});

function preload() {
    this.load.image('bg-s1-0', 'assets/bg/s1-0.png');
    this.load.image('bg-s1-1', 'assets/bg/s1-1.png');
    this.load.image('bg-s1-2', 'assets/bg/s1-2.png');
    this.load.image('bg-s1-3', 'assets/bg/s1-3.png');
    this.load.image('bg-s1-4', 'assets/bg/s1-4.png');
    this.load.spritesheet('kuso', 'assets/kuso3d-act_v3.png', { frameWidth: 240, frameHeight: 320 });
    
    this.load.spritesheet('s1-001', 'assets/ani/s1-001.png', { frameWidth: 466, frameHeight: 454 });
    this.load.spritesheet('s1-002', 'assets/ani/s1-002.png', { frameWidth: 394, frameHeight: 868 });
    this.load.spritesheet('s1-003', 'assets/ani/s1-003.png', { frameWidth: 634, frameHeight: 1076 });
}

var player;

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

    //this.physics.add.collider(this.player.sprite, worldLayer);   
    //this.scale.setGameSize(canvasWidth, canvasHeight);
}

function update(time, delta){
    player.update();
}