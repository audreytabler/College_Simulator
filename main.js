import './style.css'
import Phaser from 'phaser'
import DialogBox from './ui/dialogBox.js'
import { CampusScene } from './scenes/campusScene.js';
import {TestScene} from './scenes/testScene.js'
import {DormScene} from './scenes/dormScene.js'
import { SCENE_KEYS } from "./scenes/scene-keys";


//window.onload = function () {
    /*const config = {
        type: Phaser.WEBGL,
        canvas: gameCanvas,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 50 },
                debug: true,
            },
        },
        scene: [TestScene],
    };*/

    const game = new Phaser.Game({
        type: Phaser.WEBGL,
        canvas: gameCanvas,
        pixelArt: false,
        scale: {
          parent: 'game-container',
          width: 1024,
          height: 576,
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        backgroundColor: '#000000',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 50 },
                debug: true,
            },
        },
      });
    game.scene.add(SCENE_KEYS.CAMPUS_SCENE, CampusScene);
    game.scene.add(SCENE_KEYS.TEST_SCENE, TestScene);
    game.scene.add(SCENE_KEYS.DORM_SCENE, DormScene);
    game.scene.start(SCENE_KEYS.TEST_SCENE)

    //set initial game size
    //game.canvas.width = window.innerWidth - 10;
    //game.canvas.height = window.innerHeight - 10;

    //game canvas resize when user resizes browser window
    /*window.addEventListener('resize', function () {
        game.canvas.width = window.innerWidth - 10;
        game.canvas.height = window.innerHeight - 10;

        const activeScene = game.scene.getScene("scene-game");
        if (activeScene && activeScene.windowSizeChanged) {
            activeScene.windowSizeChanged(window.innerWidth - 10, window.innerHeight - 10);
        }
    });*/
//};

