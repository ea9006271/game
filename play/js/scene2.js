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
    
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }
}