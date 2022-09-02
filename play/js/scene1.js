import DialogBox from './DialogBox.js';
import Player from './Player.js';
var player, fish;
var dialogBox;
export default class Scene1 extends Phaser.Scene
{
    constructor()
    {
        super('scene1');
    }
    
    preload() {

    }
    
    create(){
        //設定背景圖原始寬高
        
        let scale = canvasHeight / imageHeight;
        //console.log(scale);
        let posX = imageWidth * scale / 2;
        let posY = imageHeight * scale / 2;
    
        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-2').setScale(scale).setDepth(0);//背景
        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-0').setScale(scale).setDepth(100);//前景
        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-1').setScale(scale).setDepth(50);//中景
        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-3').setScale(scale).setDepth(70);//地板
        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s1-4').setScale(scale).setDepth(100);//光點
    
        let w=397, h=795;
        var pic0, pic1, pic2;
        pic0 = this.add.tileSprite(w*1.5*scale, h/2*scale, w, h, 'pic0').setScale(scale).setDepth(50);
        pic1 = this.add.tileSprite(((w*1.5)+(w*0.8))*scale, h/2*scale, w, h, 'pic1').setScale(scale).setDepth(50);
        pic2 = this.add.tileSprite(((w*1.5)+(2*w*0.8))*scale, h/2*scale, w, h, 'pic2').setScale(scale).setDepth(50);
    
        var s1_001, s1_002, s1_003, redfish;
        s1_001 = this.physics.add.sprite((1920/3.3)*scale, (1080-(454/2))*scale, 's1-001');
        s1_001.setScale(scale).setDepth(55);
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('s1-001', { start: 0, end: 15 }),
            frameRate: 7.5,
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
    
        w=1080, h=640;
        redfish = this.physics.add.sprite((imageWidth-w/2)*scale, (imageHeight-(h/2))*scale, 'redfish');
        redfish.setScale(scale).setDepth(80);
        this.anims.create({
            key: 'redfish',
            frames: this.anims.generateFrameNumbers('redfish', { start: 0, end: 79 }),
            frameRate: 10,
            repeat: -1
        });
        redfish.anims.play('redfish', true);

        w=102,h=80;
        fish = this.physics.add.sprite((imageWidth-w)*scale, (imageHeight-h*2)*scale, 'fish');
        fish.setScale(scale).setDepth(80);
        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNumbers('fish', { start: 0, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
        fish.anims.play('swim', true);
        fish.setCollideWorldBounds(true);
        //fish.setDepth(80);
    
        player = new Player(this);
        player.sprite.setDepth(80);
    
        dialogBox = new DialogBox(this);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.loadScene();
        });
        
        this.physics.add.collider(player.sprite, fish, this.loadScene, null, this);

        this.cameras.main.fadeIn(500, 0, 0, 0);
    }
    loadScene(){
        this.physics.pause();//先暫停否則會連續觸發
        //fade to black
        //第1個參數是:毫秒
        //接下來3個參數為淡出的顏色:RGB
        this.cameras.main.fadeOut(500, 0, 0, 0);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(0, () => {
                this.scene.start('scene2');
            });        
        });        
    }
    update(){
        player.update();
        //fish.rotation -= 0.01;
    }
    
}