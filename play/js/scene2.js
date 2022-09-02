import Player from './Player.js';
var player, fish;
export default class Scene2 extends Phaser.Scene
{
    constructor()
    {
        super('scene2');
    }

    preload()
    {

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
            frameRate: 7.5,
            repeat: -1
        });
        s2_003.anims.play('s2_003', true);

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
        fish.setDepth(100);

        player = new Player(this);
        player.sprite.setDepth(80);

        this.physics.add.collider(player.sprite, fish, this.loadScene, null, this);

        this.cameras.main.fadeIn(500, 0, 0, 0);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.loadScene();
        });
     
    }

    loadScene(){
        this.physics.pause();

        //fade to black
        //第1個參數是:毫秒
        //接下來3個參數為淡出的顏色:RGB
        this.cameras.main.fadeOut(500, 0, 0, 0);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(0, () => {
                this.scene.start('scene1');
            });        
        });        
    }
    update(){
        player.update();
    }

    
}