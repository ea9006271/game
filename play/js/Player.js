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
            .setSize(240, 320)//碰撞器大小
            .setOffset(0, 0)//碰撞器位置
            .setScale(1); //縮放比例

        this.keys =scene.input.keyboard.addKeys({ 
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT});        
        /*
            this.keys = {
                up: ['UP', Phaser.Input.Keyboard.KeyCodes.UP, Phaser.Input.Keyboard.KeyCodes.W],
                right: ['RIGHT', Phaser.Input.Keyboard.KeyCodes.RIGHT, Phaser.Input.Keyboard.KeyCodes.D],
                down: ['DOWN', Phaser.Input.Keyboard.KeyCodes.DOWN, Phaser.Input.Keyboard.KeyCodes.S],
                left: ['LEFT', Phaser.Input.Keyboard.KeyCodes.LEFT, Phaser.Input.Keyboard.KeyCodes.A],
                interact: [Phaser.Input.Keyboard.KeyCodes.ENTER, Phaser.Input.Keyboard.KeyCodes.SPACE],
            }
        */
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