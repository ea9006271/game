import Player from './Player.js';
var player;
var btnL0, btnL1, btnR0, btnR1;
var cursors;
var btnLeftOn = false, btnRightOn = false;
export default class Scene2 extends Phaser.Scene
{
    constructor()
    {
        super('scene2');
    }

    preload()
    {
        this.load.image('bg-s2-0', 'assets/bg/s2-0.png');
        this.load.image('bg-s2-1', 'assets/bg/s2-1.png');
        this.load.image('bg-s2-2', 'assets/bg/s2-2.png');
        this.load.image('bg-s2-3', 'assets/bg/s2-3.png');
        this.load.image('bg-s2-4', 'assets/bg/s2-4.png');

        this.load.spritesheet('s2-001', 'assets/ani/s2-001.png', { frameWidth: 640, frameHeight: 1080 });
        this.load.spritesheet('s2-002', 'assets/ani/s2-002.png', { frameWidth: 340, frameHeight: 822 });
        this.load.spritesheet('s2-003', 'assets/ani/s2-003.png', { frameWidth: 502, frameHeight: 580 });
    }

    create()
    {
        //設定背景圖原始寬高
        let imageWidth = 1920, imageHeight = 1080;
        let scale = canvasHeight / imageHeight;
        console.log(scale);
        let posX = imageWidth * scale / 2;
        let posY = imageHeight * scale / 2;

        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s2-2').setScale(scale).setDepth(0);//背景
        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s2-0').setScale(scale).setDepth(100);//前景
        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s2-1').setScale(scale).setDepth(50);//中景
        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s2-3').setScale(scale).setDepth(70);//地板
        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s2-4').setScale(scale).setDepth(100);//光點
    
        let w = 0, h = 0;
        var s2_001, s2_002, s2_003;
        w = 640, h = 1080;
        s2_001 = this.physics.add.sprite((imageWidth/3.5)*scale, (imageHeight/2)*scale, 's2-001');
        s2_001.setScale(scale).setDepth(55);
        this.anims.create({
            key: 's2-001',
            frames: this.anims.generateFrameNumbers('s2-001', { start: 0, end: 15 }),
            frameRate: 5,
            repeat: -1
        });
        s2_001.anims.play('s2-001', true);

        w = 340, h = 822;
        s2_002 = this.physics.add.sprite((imageWidth-(w/2))*scale, (imageHeight-(h/2))*scale, 's2-002');
        s2_002.setScale(scale).setDepth(55);
        this.anims.create({
            key: 's2_002',
            frames: this.anims.generateFrameNumbers('s2-002', { start: 0, end: 15 }),
            frameRate: 5,
            repeat: -1
        });
        s2_002.anims.play('s2_002', true);
   
        w = 502, h = 580;
        s2_003 = this.physics.add.sprite((imageWidth-(w/2))*scale, (imageHeight-(h/2))*scale, 's2-003');
        s2_003.setScale(scale).setDepth(100);
        this.anims.create({
            key: 's2_003',
            frames: this.anims.generateFrameNumbers('s2-003', { start: 0, end: 15 }),
            frameRate: 5,
            repeat: -1
        });
        s2_003.anims.play('s2_003', true);

        player = new Player(this, scale);
        player.sprite.setDepth(80);

        w = 352, h=162;
        this.add.tileSprite((w/2)*scale*1.5, ((imageHeight-h)/2)*scale, w, h,  'btn0').setScale(scale*1.5).setDepth(100);
        w = 59, h=81;
        btnL0 = this.add.tileSprite((w/2*2)*scale*1.5, ((imageHeight-162)/2)*scale, w, h, 'btnL0').setScale(scale*1.5).setDepth(100);
        btnL1 = this.add.tileSprite((w/2*2)*scale*1.5, ((imageHeight-162)/2)*scale, w, h, 'btnL1').setScale(scale*1.5).setDepth(100);
        btnR0 = this.add.tileSprite((w/2*2)*scale*5*1.5, ((imageHeight-162)/2)*scale, w, h, 'btnR0').setScale(scale*1.5).setDepth(100);
        btnR1 = this.add.tileSprite((w/2*2)*scale*5*1.5, ((imageHeight-162)/2)*scale, w, h, 'btnR1').setScale(scale*1.5).setDepth(100);    btnL1.visible = false;
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

        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
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
        //  Input Events
        //cursors = this.input.keyboard.createCursorKeys();    
        cursors = this.input.keyboard.addKeys({ 
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'A': Phaser.Input.Keyboard.KeyCodes.A,
            'D': Phaser.Input.Keyboard.KeyCodes.D
        });     

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.input.keyboard.once('keydown-SPACE', () => {
            //fade to black
            //第1個參數是:毫秒
            //接下來3個參數為淡出的顏色:RGB
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        });
        
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(1000, () => {
                this.scene.start('scene1');
            });        
        });        
    }

    update(){
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

    
}