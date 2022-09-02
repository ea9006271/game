import PreloadScene from './preloadScene.js';
import Scene1 from './scene1.js';
import Scene2 from './scene2.js';

$(function(){
    setCanvas();
    var preloadScene = new PreloadScene();
    var scene1 = new Scene1();
    var scene2 = new Scene2();
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
    game.scene.add('preloadScene', preloadScene);
    game.scene.add('scene1', scene1);    
    game.scene.add('scene2', scene2);   
    game.scene.start('preloadScene');     
});