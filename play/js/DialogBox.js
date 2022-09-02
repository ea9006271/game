export default class DialogBox{
    constructor(scene){
        this.scene = scene;

        let w = 1163, h = 191;
        var box, kuso;
        box = this.scene.add.tileSprite(imageWidth*gameScale/2, ((imageHeight-h/2)*0.95)*gameScale, w, h, 'dialog-box').setScale(gameScale).setDepth(100);
        box.visible = false;
        w = 225, h = 223;
        kuso = this.scene.add.tileSprite(imageWidth*gameScale/2, ((imageHeight-h/2)*0.95)*gameScale, w, h, 'dialog-kuso').setScale(gameScale).setDepth(100);
        kuso.visible = false;
    }
}