import Phaser from 'phaser';
import DialogBox from '../ui/dialogBox.js'
import Clock from '../ui/clock.js'
import PlayerStats from '../ui/playerStats.js'
import MissionManager from '../ui/missionManager.js';
import { SCENE_KEYS } from './scene-keys.js';


export class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_KEYS.UI_SCENE, active: true }); // Make UIScene always active
        this.clock
        this.narrator;
        this.playerStats;
        this.missionManager
        this.activeScene;
    }
    preload(){
        this.load.json('narrator', "./assets/narratorDialog.json")
    }

    create() {

        this.clock = new Clock(this,this.time.now);
        this.clock.setPosition(15,800)
        
        this.narrator = new DialogBox(this, 700, 100, this.cache.json.get('narrator'));
        this.narrator.startDialog(0)

        this.statsOverlay = new PlayerStats(this)
        this.missionManager = new MissionManager(this)
        this.missionManager.drawText("CURRENT TASK: ")

        this.scene.get(SCENE_KEYS.CAMPUS_SCENE).events.on('sceneActivated', (sceneKey) => {
            this.activeScene = sceneKey;
            console.log('Active scene:', this.activeScene);
        });

        this.scene.get(SCENE_KEYS.DORM_SCENE).events.on('sceneActivated', (sceneKey) => {
            this.activeScene = sceneKey;
            console.log('Active scene:', this.activeScene);
        });

        this.events.emit('setTargetBox'); 

        
    }

    update() {
        this.events.emit('setTargetBox'); 
        // Update the clock
        this.clock.update();
       /* if (this.activeScene != null){
            console.log("active scene is " + this.activeScene)
            this.activeScene.targetBox.setPosition(0,0) 
            this.activeScene.add.text(15, 800, "this.getTimeString()", { font: '24px Arial', fill: '#ffffff' });
        }*/
    }
}

// Define Clock class as shown in the previous example


