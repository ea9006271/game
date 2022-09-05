import Player from'./Player.js'

export default class Scene301 extends Phaser.Scene
{
    constructor()
    {
        super('scene1');
    }

    create(){
        let posX = imageWidth * gameScale / 2;
        let posY = imageHeight * gameScale / 2;

        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s301-1').setScale(gameScale).setDepth(100);
        this.add.tileSprite(posX, posY, imageWidth, imageHeight, 'bg-s301-2').setScale(gameScale).setDepth(0);

        var fan01, fan02, fan03;
        let w = 646, h = 440;
        posX = (imageWidth/2)*gameScale;
        posY = (h/2)*1.2*gameScale;
        fan02 = this.physics.add.sprite(posX, posY, 'fan02');
        fan02.setScale(gameScale).setDepth(55);
        this.anims.create({
            key: 'fan02',
            frames: this.anims.generateFrameNumbers('fan02', { start: 0, end: 47 }),
            frameRate: 10,
            repeat: -1
        });
        fan02.anims.play('fan02', true);        
        
        w = 434, h = 300;
        posX = posX - w*gameScale*0.75;
        posY = posY + ((h/2)*1.2*gameScale);
        fan01 = this.physics.add.sprite(posX, posY, 'fan01');
        fan01.setScale(gameScale).setDepth(55);
        this.anims.create({
            key: 'fan01',
            frames: this.anims.generateFrameNumbers('fan01', { start: 0, end: 47 }),
            frameRate: 10,
            repeat: -1
        });
        fan01.anims.play('fan01', true);

        w = 418, h = 278;
        posX = (imageWidth/2)*gameScale + w*gameScale*0.75;
        //posY = posY + ((h/2)*1.2*gameScale);
        fan03 = this.physics.add.sprite(posX, posY, 'fan03');
        fan03.setScale(gameScale).setDepth(55);
        this.anims.create({
            key: 'fan03',
            frames: this.anims.generateFrameNumbers('fan03', { start: 0, end: 47 }),
            frameRate: 10,
            repeat: -1
        });
        fan03.anims.play('fan03', true);

        this.player = new Player(this);
        this.player.sprite.setDepth(80);
        console.log(canvasWidth);
    }

    update(time, delta){
        this.player.update();
        //console.log(this.player.sprite.x);
        //this.player.sprite.setY(this.player.sprite.y + (this.player.sprite.x * 0.01));
    }
}