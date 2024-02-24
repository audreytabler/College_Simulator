import './style.css'
import Phaser from 'phaser'
import {TitleScene} from './scenes/titleScene.js'
import { CampusScene } from './scenes/campusScene.js';
import {TestScene} from './scenes/testScene.js'
import {DormScene} from './scenes/dormScene.js'
import {UIScene} from './scenes/uiScene.js'
import { SCENE_KEYS } from "./scenes/scene-keys";

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
            // gravity: { y: 50 },
            debug: true,
        },
    },
    });
game.scene.add(SCENE_KEYS.CAMPUS_SCENE, CampusScene);
game.scene.add(SCENE_KEYS.TEST_SCENE, TestScene);
game.scene.add(SCENE_KEYS.DORM_SCENE, DormScene);
game.scene.add(SCENE_KEYS.UI_SCENE, UIScene);
game.scene.add(SCENE_KEYS.TITLE_SCENE, TitleScene);
game.scene.start(SCENE_KEYS.CAMPUS_SCENE)

