import Phaser from 'phaser'
import { Player } from '../ui/Player.js';
import DialogBox from '../ui/dialogBox.js'
import PlayerStats from '../ui/playerStats.js'
import { SCENE_KEYS } from './scene-keys.js';
import MissionManager from '../ui/missionManager.js';
export class CampusScene extends Phaser.Scene {
    //this constructor is basically side bar with all gameobjects in scene
    constructor() {
        super({ key: SCENE_KEYS.CAMPUS_SCENE });
        //gameObjects
        this.cameras
        this.player
        this.cursor
        this.playerEnteredTrigger = false;
        this.topRight;

        //npcs
        this.narrator
        this.jsonfile

        //variables
        this.playerSpeed = 400

        this.triggerArea
        this.wallsGroup;

    }

    preload() {
        this.load.image("bg", "/assets/images/backgroundSketch.png")
        this.load.image("player", "./assets/playertest.png")
        this.load.json('narrator', "./assets/narratorDialog.json")

        this.load.image("top_right", "/assets/images/toprightbuilding.png")
    }

    create() {
        this.physics.world.enable;
        this.input.enabled = true;

        this.cursor = this.input.keyboard.createCursorKeys()

        this.add.image(0,0,"bg").setOrigin(0,0)


        //player stuff
        //this.background = this.scene.add.image
        // Add the topRight image to the scene
        this.topRight = this.physics.add.image(0, 0, 'top_right').setOrigin(0, 0);

        // Create a new physics group
        this.wallsGroup = this.physics.add.group();
        //this.wallsGroup.setImmovable(true)

        // Add the topRight image to the walls group
        this.wallsGroup.add(this.topRight);
        this.wallsGroup.children.iterate(child => {
            child.setImmovable(true);
        });



        this.physics.world.setBounds(0, 0, 15351, 11260);

        this.player = this.physics.add.image(0, 0, "player").setOrigin(0, 0)//((window.innerWidth / 2), (window.innerHeight / 2), "player").setOrigin(0, 0)
        //this.player.setScale(0.2,0.2)
        this.player.setPosition(494, 2419)
        this.player.body.allowGravity = false;
        this.player.setCollideWorldBounds(true)

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
                // this.triggerEvent();
            }

        });




        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);

        this.narrator = new DialogBox(this, 700, 100, this.cache.json.get('narrator'));
        this.statsOverlay = new PlayerStats(this)
        this.missionManager = new MissionManager(this)
        this.missionManager.drawText("CURRENT TASK: ")

        //note to self later, maybe try adding different dialog boxes for different characters just specify which character when it is created?
        this.narrator.startDialog(0) //call startDialog and send in which index

        this.input.on('pointerdown', (pointer) => {

            // Log the position of the cursor when clicked
            console.log('Cursor position - X:', this.player.x, 'Y:', this.player.y);
        });
    }

    update() {

        if ((!this.physics.overlap(this.player, this.triggerArea)) && (this.playerEnteredTrigger == true)) {
            // Player left the trigger area, trigger the event
            this.playerEnteredTrigger = false; // Set the flag to false
            console.log("player left area");
        }

        const { left, right, up, down, } = this.cursor //would add up,down if overhead view
        const { W, A, S, D } = this.input.keyboard.addKeys('W,A,S,D');
        //player controls

        if (left.isDown || A.isDown)
            this.player.setVelocityX(-this.playerSpeed);
        else if (right.isDown || D.isDown)
            this.player.setVelocityX(this.playerSpeed);
        else if (up.isDown || W.isDown)
            this.player.setVelocityY(-this.playerSpeed)
        else if (down.isDown || S.isDown)
            this.player.setVelocityY(this.playerSpeed)
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }

        if (this.narrator.getIsVisible)
            this.narrator.updatePosition()
    }

}
