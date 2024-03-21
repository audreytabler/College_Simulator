import Phaser from 'phaser';
import DialogBox from '../ui/dialogBox.js'
import Clock from '../ui/clock.js'
import Phone from '../ui/phone.js'
import PlayerStats from '../ui/playerStats.js'
import MissionManager from '../ui/missionManager.js';
import TaskConfirm from '../ui/taskConfirmPopup.js';
import eventsCenter from '../ui/eventCenter.js';


export class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: "UI_SCENE", active: true }); // Make UIScene always active
        this.clock
        this.phone
        this.narrator;
        this.taskConfirm
        this.statsOverlay;-
        this.missionManager
        this.activeScene;
        this.playerSpawnX =8159
        this.playerSpawnY = 5325
    }
    preload(){
        this.load.json('narrator', "./assets/narratorDialog.json")
    }

    create() {

        //this.clock = new Clock(this,this.time.now);
       // this.clock.setPosition(15,800)


        this.phone = new Phone(this)
        this.clock = this.phone.clock

        
        this.narrator = new DialogBox(this, 700, 100, this.cache.json.get('narrator'));
        this.narrator.startDialog(0)




        this.statsOverlay = new PlayerStats(this)
        this.missionManager = new MissionManager(this)
        this.missionManager.drawText("CURRENT TASK: ")
        this.taskConfirm = new TaskConfirm(this,this.clock)
        this.newScene()

        /*this.scene.get(SCENE_KEYS.CAMPUS_SCENE).events.on('sceneActivated', (sceneKey) => {
            this.activeScene = sceneKey;
            console.log('Active scene:', this.activeScene);
        });*/
        
        /*this.scene.get(this.activeScene).events.on('sceneActivated', (sceneKey) => {
            this.activeScene = sceneKey;
            console.log('Active scene:'+ this.activeScene);
        });*/

       // this.events.emit('setTargetBox'); 
        
        /*this.scene.get(this.activeScene).events.on('shower', (sceneKey) => {
            this.activeScene = sceneKey;
            console.log("Shower Started...");
        });*/
        eventsCenter.on('shower',this.shower,this)
        eventsCenter.on('class',this.class,this)
        eventsCenter.on('sleep',this.sleep,this)
        eventsCenter.on('study',this.study,this)
        
    }

    update() {
        //this.events.emit('setTargetBox'); 
        // Update the clock
        this.clock.update();
        //this.newScene()
    
    }

    newScene(nScene){
        this.activeScene = nScene
        this.missionManager.enteredMap(nScene)
        //console.log("ui: new scene is " + this.activeScene)

    }
    shower(){
        this.narrator.startDialogg(0)
        this.missionManager.shower()
    }
    class(){
        this.narrator.startDialogg(3)
    }
    sleep(){
        //popup box to select how many hours
        this.taskConfirm.action = "sleep"
        this.taskConfirm.display()
    }
    study(){
        this.taskConfirm.action = "study"
        this.taskConfirm.display()
    }

}
