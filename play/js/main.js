import Player from './Player.js';
import Scene1 from './scene1.js';
import Scene2 from './scene2.js';

$(function(){
    setCanvas();
    var config = {
        type: Phaser.AUTO,
        width: canvasWidth,
        height: canvasHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        transparent: false,
        parent: "Content",
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        }
    };
    var game = new Phaser.Game(config);  
    game.scene.add('scenes', Scene1);    
    game.scene.add('scenes', Scene2);   
    game.scene.start('scene1');     
});