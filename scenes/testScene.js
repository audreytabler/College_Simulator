import Phaser from 'phaser'
import { Player } from '../ui/Player.js';
import DialogBox from '../ui/dialogBox.js'
import PlayerStats from '../ui/playerStats.js'
import { SCENE_KEYS } from './scene-keys.js';
export class TestScene extends Phaser.Scene {
    //this constructor is basically side bar with all gameobjects in scene
    constructor() {
        super({key: SCENE_KEYS.TEST_SCENE,});
        //gameObjects
        this.cameras
        this.player
        this.cursor
        this.playerEnteredTrigger = false;

        //npcs
        this.narrator
        this.jsonfile

        //variables
        this.playerSpeed = 270

        //brainstorming idea: choose character type at beginning of game
        //ie gym type uses less energy at gym, academic studying decreases stress but social raises it more
        this.statsOverlay;
        //keep grade by going to class
        //doing good on test minigame increases grade
        this.grade

        //raise by eating & sleeping, decreases through day, low energy = slower movespeed
        //use energy to go to gym, gym reduces stress & increases energy for next day
        this.energy

        //increases via studying, social drama (random event), and not cleaning room
        //decreases via cleaning, good social (social is a minigame?), & meditating,
        this.stress

        //if social levels get too low, lonely energy debuff 
        //high energy levels = study group = studying doesn't increase stress
        this.social

        //soundfx
        this.bgMusic
    }

    preload() {
        //this.load.image("bg", "/assets/bg.png")
        this.load.image("player", "./assets/circle.png")
        this.load.json('narrator', "./assets/narratorDialog.json")
        this.load.image("tiles", "./assets/tiles.png");
    }

    create() {
        
        this.input.enabled = true;
        //this.add.image(0, 0, "bg").setOrigin(0, 0)
        const array = 
        [[0, 1, 1, 2],
        [17, 18, 18, 19],
        [17, 18, 18, 19],
        [17, 18, 18, 19],
        [17, 18, 18, 19],
        [17, 18, 18, 19],
        [17, 18, 18, 19],
        [17, 18, 18, 19],
        [17, 18, 18, 19],
        [34, 35,35, 36]];
        const map = this.make.tilemap({ data: array, tileWidth: 64, tileHeight: 64 });
        map.addTilesetImage("tiles");
        const layer = map.createLayer(0, "tiles", 0, 0);

        this.cursor = this.input.keyboard.createCursorKeys()

        //player stuff
        
        this.player = this.physics.add.image((window.innerWidth / 2), (window.innerHeight / 2), "player").setOrigin(0, 0)
        this.player.setScale(0.2,0.2)
        this.player.setImmovable(true)
        this.player.body.allowGravity = false;
        this.player.setCollideWorldBounds(true)
       // this.player.setSize(20,15).setOffset(10,70)
       //this.player = new Player(this)

       //code for detecting if player is in area
       const triggerArea = this.add.rectangle(100, 100, 200, 100, 0x000000, 100); // Invisible rectangle trigger area
       this.physics.add.existing(triggerArea, true); 
       this.physics.add.collider(this.player, triggerArea, () => {
        if (!this.playerEnteredTrigger) {
            // Player entered the trigger area for the first time, trigger the event
            this.playerEnteredTrigger = true; // Set the flag to true
            console.log("player entered area")
           // this.triggerEvent();
        }
    });
    
    this.physics.add.overlap(this.player, triggerArea, () => {
        if (!this.physics.overlap(this.player, triggerArea)) {
            // Player left the trigger area, trigger the event
            this.playerEnteredTrigger = false; // Set the flag to false
            console.log("player left area")
        }
    }, null, this);


       this.cameras.main.startFollow(this.player,false,0.2,0.2);
       
       this.narrator = new DialogBox(this, 700, 100, this.cache.json.get('narrator'));
       this.statsOverlay = new PlayerStats(this)

        //note to self later, maybe try adding different dialog boxes for different characters just specify which character when it is created?
        this.narrator.startDialog(0) //call startDialog and send in which index
    }

    update() {
        
        const { left, right, up, down, } = this.cursor //would add up,down if overhead view
        const { W, A, S, D } = this.input.keyboard.addKeys('W,A,S,D');
        //player controls
        if (left.isDown || A.isDown )
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

    windowSizeChanged(width, height) {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        this.scene.width = width;

        // Update camera and player position based on the new window size
        //this.cameras.main.setBounds(0, 0, newWidth, newHeight);
        //this.cameras.main.centerOn(this.player.x, this.player.y);

        //this.player.setPosition(width * 0.5, height * 0.5)
        /*if (height < 220 )
        this.player.setPosition((width*0.5),(height*0.8))
        else 
        this.player.setPosition((width*0.5),(height*0.5))*/
        //this.player.setPosition(width*0.5,(canvas.height*0.5))
    }

}
export default TestScene;