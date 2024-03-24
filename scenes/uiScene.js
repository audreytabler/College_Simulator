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
        this.statsOverlay;
        this.missionManager
        this.activeScene;
        this.playerSpawnX =8159 //6830    6830.0000000000055 Y: 7111.666666666748
        this.playerSpawnY =5325 //   7111

        this.skinTone =3
        this.hairType=1;
        this.hairColor =0x9884CD
        this.shirtColor = 0x818A92

        this.ambientColor = 0xF7F7F7;
    }
    preload(){
        this.load.json('narrator', "./assets/narratorDialog.json")
    }

    create() {
        
        this.phone = new Phone(this)
        this.clock = this.phone.clock

        
        this.narrator = new DialogBox(this, 700, 100, this.cache.json.get('narrator'));
        this.narrator.startDialog(0)


        this.statsOverlay = new PlayerStats(this)
        this.missionManager = new MissionManager(this)
        this.missionManager.drawText("CURRENT TASK: ")
        this.taskConfirm = new TaskConfirm(this,this.clock)
        this.newScene()

        eventsCenter.on('shower',this.shower,this)
        eventsCenter.on('class',this.class,this)
        eventsCenter.on('sleep',this.sleep,this)
        eventsCenter.on('study',this.study,this)

        eventsCenter.on('sunUp',this.sunUp,this)
        eventsCenter.on('sunDown',this.sunDown,this)
        
    }

    update() {
        // Update the clock
        this.clock.update();
    
    }

    newScene(nScene){
        this.activeScene = nScene
        this.missionManager.enteredMap(nScene)

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
    sunUp(){
        this.ambientColor = 0xF7F7F7
    }
    sunDown(){
        this.ambientColor = 0x5A5A59
    }
    

    

}
