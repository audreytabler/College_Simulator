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
        this.uiScene

        this.playerEnteredTrigger = false
    }
    preload(){
        this.uiScene = this.scene.get("UI_SCENE")
        this.load.spritesheet('player', 'assets/CharacterSpritesheetBald'+this.uiScene.skinTone+'.png', { frameWidth: 85, frameHeight: 150 });
        this.load.spritesheet('hair', ('assets/CharacterSpriteHair'+this.uiScene.hairType+'.png'), { frameWidth: 85, frameHeight: 150 });
        this.load.spritesheet('shirt', 'assets/CharacterSpritesheetShirt.png', { frameWidth: 85, frameHeight: 150 });
        
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

        this.lights.enable().setAmbientColor(0xF7F7F7);


        //TILEMAP STUFF
        let map = this.make.tilemap({key: 'campusMap'})
        let grassTileset = map.addTilesetImage("MainTileset","tiles")

        let groundlayer = map.createLayer("grass",grassTileset).setPipeline('Light2D')
        let pathlayer = map.createLayer("details",grassTileset).setPipeline('Light2D')
        let wallLayer = map.createLayer("buildings",grassTileset).setPipeline('Light2D')

        //COLLISION WITH WALLS STUFF
        this.loadPlayer()
        let treesLayer = map.createLayer("trees",grassTileset).setPipeline('Light2D')
        wallLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, wallLayer);
        this.physics.add.collider(this.hair, wallLayer);
        this.physics.add.collider(this.shirt, wallLayer);
        ////////////////////////////////////////
        this.overlapArray=[]
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
        const { left, right, up, down, } = this.cursor //would add up,down if overhead view
        const { W, A, S, D } = this.input.keyboard.addKeys('W,A,S,D');

        if (left.isDown || A.isDown){
            this.player.setVelocityX(-this.playerSpeed);
            this.player.play("left",true)

            this.hair.setVelocityX(-this.playerSpeed);
            this.hair.play("lefth",true)

            this.shirt.setVelocityX(-this.playerSpeed);
            this.shirt.play("lefts",true)
        }
        else if (right.isDown || D.isDown){
            this.player.setVelocityX(this.playerSpeed);
            this.player.play("right",true)

            this.hair.setVelocityX(this.playerSpeed);
            this.hair.play("righth",true)
            this.shirt.setVelocityX(this.playerSpeed);
            this.shirt.play("rights",true)
        }
        else if (up.isDown || W.isDown){
            this.player.setVelocityY(-this.playerSpeed)
            this.player.play("back",true)

            this.hair.setVelocityY(-this.playerSpeed)
            this.hair.play("backh",true)

            this.shirt.setVelocityY(-this.playerSpeed)
            this.shirt.play("backs",true)

        }
        else if (down.isDown || S.isDown){
        
            this.player.setVelocityY(this.playerSpeed)
            this.player.play("forward",true)

            this.hair.setVelocityY(this.playerSpeed)
            this.hair.play("forwardh",true)

            this.shirt.setVelocityY(this.playerSpeed)
            this.shirt.play("forwards",true)
        }
        else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.hair.setVelocityX(0);
            this.hair.setVelocityY(0)
            this.shirt.setVelocityX(0);
            this.shirt.setVelocityY(0)
            this.player.play("idle",true)
            this.hair.play("idleh",true)
            this.shirt.play("idles",true)
        }
    }

    loadPlayer(){
        const playerX = this.uiScene.playerSpawnX
        const playerY = this.uiScene.playerSpawnY
        this.player = this.physics.add.sprite(playerX, playerY, "player").setOrigin(0, 0)
        this.hair = this.physics.add.sprite(playerX, playerY, "hair").setOrigin(0, 0)
        this.shirt = this.physics.add.sprite(playerX, playerY, "shirt").setOrigin(0, 0)
    
        this.player.setBodySize(65,120)
        this.player.setMaxVelocity(this.playerSpeed)
        this.player.setPipeline('Light2D')
        this.hair.setMaxVelocity(this.playerSpeed)
        this.hair.setBodySize(65,120)
        this.hair.setTint(this.uiScene.hairColor)
        this.hair.setPipeline('Light2D')
        this.shirt.setMaxVelocity(this.playerSpeed)
        this.shirt.setBodySize(65,120)
        this.shirt.setTint(this.uiScene.shirtColor)
        this.shirt.setPipeline('Light2D')   

        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
        if (this.anims.get('righth') == undefined) {
        
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
    
            ///////
            this.anims.create({
                key: "idleh",
                frameRate: 10,
                frames: this.anims.generateFrameNumbers("hair", { start: 0, end: 0 }),
                repeat: -1
            });
            this.anims.create({
                key: "forwardh",
                frameRate: 10,
                frames: this.anims.generateFrameNumbers("hair", { start: 10, end: 14 }),
                repeat: -1
            });
            this.anims.create({
                key: "lefth",
                frameRate: 7,
                frames: this.anims.generateFrameNumbers("hair", { start: 15, end: 17 }),
                repeat: -1
            });
            this.anims.create({
                key: "righth",
                frameRate: 7,
                frames: this.anims.generateFrameNumbers("hair", { start: 20, end: 22 }),
                repeat: -1
            });
            this.anims.create({
                key: "backh",
                frameRate: 7,
                frames: this.anims.generateFrameNumbers("hair", { start: 25, end: 28 }),
                repeat: -1
            });
            //////
    
            this.anims.create({
                key: "idles",
                frameRate: 10,
                frames: this.anims.generateFrameNumbers("shirt", { start: 0, end: 0 }),
                repeat: -1
            });
            this.anims.create({
                key: "forwards",
                frameRate: 10,
                frames: this.anims.generateFrameNumbers("shirt", { start: 10, end: 14 }),
                repeat: -1
            });
            this.anims.create({
                key: "lefts",
                frameRate: 7,
                frames: this.anims.generateFrameNumbers("shirt", { start: 15, end: 17 }),
                repeat: -1
            });
            this.anims.create({
                key: "rights",
                frameRate: 7,
                frames: this.anims.generateFrameNumbers("shirt", { start: 20, end: 22 }),
                repeat: -1
            });
            this.anims.create({
                key: "backs",
                frameRate: 7,
                frames: this.anims.generateFrameNumbers("shirt", { start: 25, end: 28 }),
                repeat: -1
            });
        }
    
        }

    }
