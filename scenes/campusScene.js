import Phaser from 'phaser'
import { Player } from '../ui/Player.js';
import DialogBox from '../ui/dialogBox.js'
import Clock from '../ui/clock.js'
import PlayerStats from '../ui/playerStats.js'
import MissionManager from '../ui/missionManager.js';

export class CampusScene extends Phaser.Scene {
    //this constructor is basically side bar with all gameobjects in scene
    constructor() {
        super({ key: "CAMPUS_SCENE" });
        //gameObjects
        this.cameras
        this.player
        this.cursor
        this.playerEnteredTrigger = false;
        this.topRight;
        this.missionManager;
        this.targetBox;
        this.clock;
        this.uiScene;

        //npcs
        this.narrator

        //variables
        this.playerSpeed = 400

        this.triggerArea
        this.popUp
        this.wallsGroup;
    }

    preload() {
        this.load.image("bg", "/assets/images/backgroundSketch.png")
        this.load.image("popUp", "/assets/playertest.png")
        this.load.spritesheet('player', 'assets/CharacterSpritesheet.png', { frameWidth: 85, frameHeight: 150 });
        this.load.json('narrator', "./assets/narratorDialog.json")

        this.load.image("top_right", "/assets/images/toprightbuilding.png")
    }

    create() {
        this.uiScene = this.scene.get("UI_SCENE")
        this.events.emit('sceneActivated', this);

        this.physics.world.enable;
        this.physics.world.setBounds(0, 0, 15351, 11260);
        this.input.enabled = true;
        this.cursor = this.input.keyboard.createCursorKeys()

        this.add.image(0,0,"bg").setOrigin(0,0)

        this.popUp = this.add.image(494,2419,'popup')
        this.popUp.setInteractive()
        this.popUp.setVisible(false)
        this.popUp.on('pointerdown',()=> {this.uiScene.narrator.disableClicks(); this.scene.start("TEST_SCENE");})

        this.topRight = this.physics.add.image(0, 0, 'top_right').setOrigin(0, 0);

        // Create a new physics group
        this.wallsGroup = this.physics.add.group();
        //this.wallsGroup.setImmovable(true)

        // Add the topRight image to the walls group
        this.wallsGroup.add(this.topRight);
        this.wallsGroup.children.iterate(child => {
            child.setImmovable(true);
        });

        this.player()
        //this.scene.launch(SCENE_KEYS.UI_SCENE);

        this.physics.add.collider(this.player, this.wallsGroup);

        //code for detecting if player is in area
        //enter dorm trigger area
        this.triggerArea = this.add.rectangle(100, 100, 200, 100, 0x000000, 0); // Invisible rectangle trigger area
        this.triggerArea.setPosition(510,2260) 
        this.physics.add.existing(this.triggerArea, true);

        this.physics.add.overlap(this.player, this.triggerArea, () => {
            if (!this.playerEnteredTrigger) {
                // Player entered the trigger area for the first time, trigger the event
                this.playerEnteredTrigger = true; // Set the flag to true
                console.log("player entered area")
                this.popUp.setVisible(true)
               // this.missionManager.setCriteriaMet(true)
                // this.triggerEvent();
            }

        });

        //target box for setting goals
        this.targetBox = this.add.rectangle(100, 100, 200, 100, 0x000000, 0); // Invisible rectangle trigger area
        this.targetBox.setPosition(510,2260) 
        this.physics.add.existing(this.targetBox, true);

        this.physics.add.overlap(this.player, this.targetBox, () => {
            if (!this.playerEnteredTrigger) {
                // Player entered the trigger area for the first time, trigger the event
                this.playerEnteredTrigger = true; // Set the flag to true
                console.log("player entered target box")
                this.popUp.setVisible(true)
               // this.missionManager.setCriteriaMet(true)
                // this.triggerEvent();
            }

        });


        this.input.on('pointerdown', (pointer) => {
            // Log the position of the cursor when clicked
            console.log('player position - X:', this.player.x, 'Y:', this.player.y);
        });

        this.scene.get("UI_SCENE").events.on('setTargetBox', () => {
            console.log("setting target box position... target box y is "+this.targetBox.y )
            this.targetBox.setPosition(510,2500)
        });
        console.log("this key is " + this.sys.settings.key)
        this.scene.get("UI_SCENE").newScene(this.sys.settings.key)
    }
    

    update() {

        //this.clock.update();
        //const deltaTime = this.time.now;


        if ((!this.physics.overlap(this.player, this.triggerArea)) && (this.playerEnteredTrigger == true)) {
            // Player left the trigger area, trigger the event
            this.playerEnteredTrigger = false; // Set the flag to false
            this.popUp.setVisible(false)
            console.log("player left area");
            //this.missionManager.setCriteriaMet(false)
        }
        

        const { left, right, up, down, } = this.cursor //would add up,down if overhead view
        const { W, A, S, D } = this.input.keyboard.addKeys('W,A,S,D');
        //player controls

        if (left.isDown || A.isDown){
            this.player.setVelocityX(-this.playerSpeed);
            this.player.play("left",true)
        }
        else if (right.isDown || D.isDown){
            this.player.setVelocityX(this.playerSpeed);
            this.player.play("right",true)
        }
        else if (up.isDown || W.isDown){
            this.player.setVelocityY(-this.playerSpeed)
            this.player.play("back",true)

        }
        else if (down.isDown || S.isDown){
            this.player.setVelocityY(this.playerSpeed)
            this.player.play("forward",true)
        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.play("idle",true)
            //this.player.frame = 0;
        }

      /*  if (this.narrator.getIsVisible)
            this.narrator.updatePosition()*/
    }

    player(){
        this.anims.create({
            key: "idle",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
            repeat: -1
        });
        this.anims.create({
            key: "forward",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("player", { start: 10, end: 14 }),
            repeat: -1
        });
        this.anims.create({
            key: "left",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("player", { start: 15, end: 17 }),
            repeat: -1
        });
        this.anims.create({
            key: "right",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("player", { start: 20, end: 22 }),
            repeat: -1
        });
        this.anims.create({
            key: "back",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("player", { start: 25, end: 28 }),
            repeat: -1
        });

        this.player = this.physics.add.sprite(0, 0, "player").setOrigin(0, 0)//((window.innerWidth / 2), (window.innerHeight / 2), "player").setOrigin(0, 0)
        //this.player.setScale(0.2,0.2)
        this.player.setPosition(494, 2419)
        this.player.body.allowGravity = false;
        this.player.setBodySize(65,120)
        this.player.setCollideWorldBounds(true)

        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);

    }

}
