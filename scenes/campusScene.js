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
        this.sceneActive =true
        this.cameras
        this.player
        this.playerSpeed = 400
        this.cursor
        this.targetBox
        this.popUp
        this.uiScene

        this.playerEnteredTrigger = false

        this.wallsGroup;
    }
    preload(){
        //this.load.image("back", "/assets/dormBG.png")
        this.load.spritesheet('player', 'assets/CharacterSpritesheet2.png', { frameWidth: 85, frameHeight: 150 });
        this.load.image("popUp", "/assets/enter.png")
        
        //tilemap
        this.load.image("tiles","/assets/CollegeTileSet.png")
        this.load.tilemapTiledJSON("campusMap", "/assets/campusMapJson.tmj")

    }
    create(){
        
        this.scene.get("UI_SCENE").newScene(this.sys.settings.key)
        this.uiScene = this.scene.get("UI_SCENE")

        this.physics.world.enable;
        this.physics.world.setBounds(0, 0, 9035, 6347);
        this.input.enabled = true;
        this.cursor = this.input.keyboard.createCursorKeys()


        //TILEMAP STUFF
        let map = this.make.tilemap({key: 'campusMap'})
        let grassTileset = map.addTilesetImage("MainTileset","tiles")

        let groundlayer = map.createLayer("grass",grassTileset)
        let pathlayer = map.createLayer("details",grassTileset)
        let wallLayer = map.createLayer("buildings",grassTileset)

        //COLLISION WITH WALLS STUFF
        this.loadPlayer()
        this.overlapArray=[]
        let treesLayer = map.createLayer("trees",grassTileset)
        wallLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, wallLayer);
        ////////////////////////////////////////
        const transportLayer = map.getObjectLayer("transportation"); 

        transportLayer.objects.forEach(object => {
            //if (object.type === 'transportTrigger') {
                //console.log(object)
                //console.log(object.x)
                const transportRect = this.add.rectangle(object.x, object.y, object.width, object.height);
                transportRect.setOrigin(0); // Make collisions based on top-left corner
                transportRect.setAlpha(0); // Keep it invisible
                this.physics.add.existing(transportRect, true);

                this.physics.add.overlap(this.player, transportRect, () => {
                    //console.log("player overlaps" + object.properties.find(prop => prop.name === 'toSceneKey').value)
                    this.uiScene.playerSpawnX = object.properties.find(prop => prop.name === 'playerSpawnX').value
                    this.uiScene.playerSpawnY = object.properties.find(prop => prop.name === 'playerSpawnY').value
                   //this.scene.start("CAMPUS_SCENE")
                   if(!this.playerEnteredTrigger){
                    this.cameras.main.fadeOut(1000, 0, 0, 0)
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                        this.scene.start(object.properties.find(prop => prop.name === 'toSceneKey').value); 
                    })
                }
                    this.playerEnteredTrigger = true 
                });
                this.overlapArray.push(transportRect)
            //}
        });
        /////////////     

        this.input.on('pointerdown', (pointer) => {
            // Log the position of the cursor when clicked
            console.log('player position - X:', this.player.x, 'Y:', this.player.y);
        });

    }
    update(){
        if ((!this.physics.overlap(this.player, this.overlapArray)) && (this.playerEnteredTrigger == true)) {
            // Player left the trigger area, trigger the event
            this.playerEnteredTrigger = false; // Set the flag to false
        }
        if(this.sceneActive){
        const { left, right, up, down, } = this.cursor //would add up,down if overhead view
        const { W, A, S, D } = this.input.keyboard.addKeys('W,A,S,D');

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
    }
    }

    loadPlayer(){
        console.log("transport log, x is " + this.uiScene.playerSpawnX + " y is " + this.uiScene.playerSpawnY)
        this.player = this.physics.add.sprite(0, 0, "player").setOrigin(0, 0)
        const playerX = this.uiScene.playerSpawnX
        const playerY = this.uiScene.playerSpawnY
        this.player.setPosition(playerX,playerY)
        //this.player.setPosition(this.uiScene.playerSpawnX,this.uiScene.playerSpawnY)//this.player.setPosition(1261,1183)//this.player.setPosition(2555,1183)//this.player.setPosition(920, 2139)
        this.player.body.allowGravity = false;
        this.player.setBodySize(65,120)
        this.player.setCollideWorldBounds(true)

        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
        /*
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
        });*/

    }
}