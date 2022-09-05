var moveRight = false, moveLeft = false;
export default class Player {
    constructor(scene) {
        
        this.scene = scene;
        //this.scene.physics.world.enable(this);
        //this.scene.add.existing(this);

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
        let x = 240*gameScale*1.4375/2;
        //console.log(x);
        let y = 320*gameScale*1.4375*1.75;
        //console.log(y);
        
        this.sprite = scene.physics.add
            .sprite(x, y, "kuso", 0)//初始位置
            .setSize(150, 320)//碰撞器大小
            .setOffset(50, 0)//碰撞器位置
            .setScale(gameScale*1.4375); //縮放比例
        
            this.sprite.setCollideWorldBounds(true);//會碰撞遊戲世界的邊界

        this.keys =scene.input.keyboard.addKeys({ 
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'A': Phaser.Input.Keyboard.KeyCodes.A,
            'D': Phaser.Input.Keyboard.KeyCodes.D
        });    
        let x1 = canvasWidth / 5;
        let x2 = x1 * 4;    
        scene.input.on('pointerdown', function (pointer) {
            if(pointer.x < x1){
                moveLeft = true;
                moveRight = false;
            }
            else if(pointer.x >= x2){
                moveLeft = false;
                moveRight = true;
            }
            else{
                moveLeft = false;
                moveRight = false;
            }
        })
        .on('pointerup', function(){
            moveLeft = false;
            moveRight = false;
        });

        this.sprite.anims.play("stand", true);
    }

    update() {
        const sprite = this.sprite;
        const prevVelocity = sprite.body.velocity.clone();
        sprite.body.setVelocity(0);        
        const keys = this.keys;
        if (keys.left.isDown || keys.A.isDown || moveLeft) {
            if(gameLevel == 2){
                sprite.body.setVelocityY(100);
            }               
            sprite.body.setVelocityX(-speed);
            sprite.anims.play("left", true);
        } else if (keys.right.isDown || keys.D.isDown  || moveRight) {
            if(gameLevel == 2){
                sprite.body.setVelocityY(-100);
            }            
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