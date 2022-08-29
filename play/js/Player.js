export default class Player {
    constructor(scene, scale) {
        
        this.scene = scene;

        const anims = scene.anims;
        //角色動畫
        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers('kuso', { start: 0, end: 21 }),
            frameRate: 22,
            repeat: -1
        });
        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers('kuso', { start: 22, end: 43 }),
            frameRate: 22,
            repeat: -1
        });
        anims.create({
            key: 'stand',
            frames: anims.generateFrameNumbers('kuso', { start: 44, end: 55 }),
            frameRate: 22,
            repeat: -1
        });

        //計算初始位置
        let x = 240*scale*1.4375/2;
        console.log(x);
        let y = 320*scale*1.4375*1.75;
        console.log(y);

        this.sprite = scene.physics.add
            .sprite(x, y, "kuso", 0)//初始位置
            .setSize(240, 320)//碰撞器大小
            .setOffset(0, 0)//碰撞器位置
            .setScale(scale*1.4375); //縮放比例

        this.keys =scene.input.keyboard.addKeys({ 
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'A': Phaser.Input.Keyboard.KeyCodes.A,
            'D': Phaser.Input.Keyboard.KeyCodes.D
        });        
        this.sprite.anims.play("stand", true);
        var moveRight = false, moveLeft = false;
    }
    
    update(time, delta) {
        const speed = 175;
        const sprite = this.sprite;
        const prevVelocity = sprite.body.velocity.clone();
        sprite.body.setVelocity(0);        
        const keys = this.keys;
        if (keys.left.isDown || keys.A.isDown || this.moveLeft) {
            sprite.body.setVelocityX(-speed);
            sprite.anims.play("left", true);
        } else if (keys.right.isDown || keys.D.isDown  || this.moveRight) {
            sprite.body.setVelocityX(speed);
            sprite.anims.play("right", true);
        }
        else{
            //sprite.anims.stop();
            sprite.anims.play("stand", true);
        }
        
    }

    destroy() {
        this.sprite.destroy();
    }
}