export default class DialogBox{
    constructor(scene){
        this.scene = scene;

        //var box, kuso, npc01, btn;

        let w = 1163, h = 191;
        let x = imageWidth*gameScale/2;
        let y = ((imageHeight-h/2)*0.95)*gameScale;
        this.box = scene.add.tileSprite(x, y, w, h, 'dialog-box').setScale(gameScale).setDepth(100);
        this.box.visible = false;

        w = 32, h = 24;
        x = imageWidth*gameScale/2 + (1163/2)*gameScale*0.85;
        y = (imageHeight-191*0.45)*gameScale;
        this.btn = scene.add.tileSprite(x, y, w, h, 'dialog-btn').setScale(gameScale).setDepth(100);
        this.btn.visible = false;
        this.btn.setInteractive({
            useHandCursor: true
        }).on('pointerdown', () => this.next());
        
        w = 225, h = 223;
        x = (imageWidth*gameScale/2)-(1163/2-w/2)*gameScale*1.05;
        y = ((imageHeight-h/2)*0.965)*gameScale;
        this.kuso = scene.add.tileSprite(x, y, w, h, 'dialog-kuso').setScale(gameScale).setDepth(100);
        this.kuso.visible = false;

        this.npc01 = scene.add.tileSprite(x, y, w, h, 'dialog-npc01').setScale(gameScale).setDepth(100);
        this.npc01.visible = false;

        let fsize = gameScale * 30;
        let fwidth = gameScale * 820;
        this.msg = scene.add.text(x*1.3, y*0.925, "", 
            { fontSize: fsize, fontFamily: '微軟正黑體', 
            fontWeight: 'bold', fill: '#000000',
            wordWrap: {width: fwidth, useAdvancedWrap: true} }).setDepth(100);
        this.msg.visible = false;

        this.showMsg = false;
    }
    show(){
        this.text = "不知道玉如意在哪裡？";
        this.index = 0;
        this.timer = 0;

        // this 指稱的是所建立的 instance
        this.box.visible = true;
        this.btn.visible = true;
        this.kuso.visible = true;
        this.msg.visible = true;
        
        this.showMsg = true;

    }
    update(time, delta){
        //console.log(delta);
        if(this.showMsg){
            this.addText(time, delta);
        }
    }
    
    addText(time, delta){
        const delayTime = 100;
        this.timer += delta;
        while(this.timer > delayTime){
            var words = this.msg.text;
            const data = this.text.split('');
            if(this.index < data.length){
                words += data[this.index ++];
                this.msg.text = words;
            }
            else
            {
                this.showMsg = false;
            }
            this.timer -= delayTime;
        }
    }
  
    next(){
        this.close();
    }
    close(){
        this.box.visible = false;
        this.btn.visible = false;
        this.kuso.visible = false;
        this.msg.visible = false;
    }
}