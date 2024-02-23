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
    }
    preload(){
        this.load.json('narrator', "./assets/narratorDialog.json")
    }

    create() {
        console.log("UIScene launched!")
        // Create the clock
        this.clock = new Clock(this,this.time.now);
        
        this.narrator = new DialogBox(this, 700, 100, this.cache.json.get('narrator'));
        this.narrator.startDialog(0)

        this.statsOverlay = new PlayerStats(this)
        this.missionManager = new MissionManager(this)
        this.missionManager.drawText("CURRENT TASK: ")
    }

    update() {
        // Update the clock
        this.clock.update();
    }
}

// Define Clock class as shown in the previous example


