export default class Player {
    constructor(scene, x, y) {
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

        this.sprite = scene.physics.add
            .sprite(x, y, "kuso", 0)//初始位置
            .setSize(30, 30)//碰撞器大小
            .setOffset(0, 20)//碰撞器位置
            .setScale(1); //縮放比例

        this.keys =scene.input.keyboard.addKeys({ 
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D});   
        
        this.sprite.anims.play("stand", true);
    }

    update(time, delta) {
        const keys = this.keys;
        const sprite = this.sprite;
        const speed = 175;
        const prevVelocity = sprite.body.velocity.clone();
        sprite.body.setVelocity(0);

        if (keys.left.isDown) {
            sprite.body.setVelocityX(-speed);
            sprite.anims.play("left", true);
        } else if (keys.right.isDown) {
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