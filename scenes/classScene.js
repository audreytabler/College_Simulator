import Phaser from 'phaser'
import { NPC } from '../ui/NPC';


export class ClassScene extends Phaser.Scene{
    constructor(){
        super({
            key: "CLASS_SCENE"
        });
        this.cameras
        this.player
        this.playerSpeed = 400
        this.cursor
        this.popUp
        this.uiScene
        this.popUpBox;
        this.overlapArray

        this.playerEnteredTrigger = false
    }
    preload(){
        this.uiScene = this.scene.get("UI_SCENE")
        this.load.spritesheet('player', 'assets/CharacterSpritesheetBald'+this.uiScene.skinTone+'.png', { frameWidth: 85, frameHeight: 150 });
        this.load.spritesheet('hair', ('assets/CharacterSpriteHair'+this.uiScene.hairType+'.png'), { frameWidth: 85, frameHeight: 150 });
        this.load.spritesheet('shirt', 'assets/CharacterSpritesheetShirt.png', { frameWidth: 85, frameHeight: 150 });
        this.load.image("popUp", "/assets/enter.png")
        
        this.load.image("tiles","/assets/CollegeTileSet.png")
        this.load.tilemapTiledJSON("classMap", "/assets/ClassMap.tmj")

    }
    create(){
        this.sound.stopAll();
        var music = this.sound.add('inside');
        music.play();

        this.scene.get("UI_SCENE").newScene(this.sys.settings.key)
        this.uiScene = this.scene.get("UI_SCENE")

        this.physics.world.enable;
        this.physics.world.setBounds(0, 0, 9035, 6347);
        this.input.enabled = true;
        this.cursor = this.input.keyboard.createCursorKeys()


        //TILEMAP STUFF
        let map = this.make.tilemap({key: 'classMap'})
        let grassTileset = map.addTilesetImage("MainTileset","tiles")

        let groundlayer = map.createLayer("background",grassTileset)
        let wallLayer = map.createLayer("walls",grassTileset)

        //COLLISION WITH WALLS STUFF
        this.loadPlayer()
        this.npc = new NPC(this,7525,5840,"Alex",0,'npc4')
        //206.33333333333087 Y: 1707.3333333333446
        wallLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, wallLayer);
        this.physics.add.collider(this.hair, wallLayer);
        this.physics.add.collider(this.shirt, wallLayer);
        ////////////////////////////////////////
        const transportLayer = map.getObjectLayer("transportation"); 
        this.overlapArray=[]

        transportLayer.objects.forEach(object => {
                const transportRect = this.add.rectangle(object.x, object.y, object.width, object.height);
                transportRect.setOrigin(0); // Make collisions based on top-left corner
                transportRect.setAlpha(0); // Keep it invisible
                this.physics.add.existing(transportRect, true);

                this.physics.add.overlap(this.player, transportRect, () => {
                    if(!this.playerEnteredTrigger){
                        this.cameras.main.fadeOut(1000, 0, 0, 0)
                        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                            this.scene.start(object.properties.find(prop => prop.name === 'toSceneKey').value); 
                        })
                    }
                    this.playerEnteredTrigger = true 
                    this.overlapArray.push(transportRect)
                });
        });
        //////////////////////////////////////////
        const roomNumLayer = map.getObjectLayer("RoomNumbers"); 

        roomNumLayer.objects.forEach(object => {
            const roomRect = this.add.rectangle(object.x, object.y, object.width, object.height);
            roomRect.setOrigin(0); // Make collisions based on top-left corner
            roomRect.setAlpha(0); // Keep it invisible
            this.physics.add.existing(roomRect, true);
            

            this.physics.add.overlap(this.player, roomRect, () => {
                this.usableObject = object.properties.find(prop => prop.name === 'roomNumber').value
                if(!this.playerEnteredTrigger){    
                    this.uiScene.clickClassRoom(this.usableObject)
                }
                this.playerEnteredTrigger = true
                this.popUpText.setVisible(true)
                this.popUpBox.setVisible(true)
                this.popUpBox.width=(this.usableObject.toString().length * 15)
                this.popUpText.setText(this.usableObject)
                this.popUpText.setPosition(roomRect.x,roomRect.y)
                this.popUpBox.setPosition(roomRect.x+30,roomRect.y+15)

            });
            this.overlapArray.push(roomRect)
        });   
        this.popUpBox = this.add.rectangle(8159+50, 5305+20, 75, 30,0x226184,0.5).setInteractive()
        this.popUpBox.setVisible(false)
        this.popUpBox.setInteractive()
        this.popUpBox.setInteractive()
        this.popUpText = this.add.text(8159, 5305, " " + (this.usableObject), { 
            fontFamily: 'sans-serif', 
            fontSize: '24px', 
            color: '#ffffff',
        });  
        this.popUpBox.on('pointerover',() => {
            this.popUpBox.setScale(1.3)
        });
        this.popUpBox.on('pointerout',() => {
            this.popUpBox.setScale(1)
        });
        this.popUpBox.on('pointerdown', () => {
            this.uiScene.clickClassRoom(this.usableObject)
        })
        
        this.input.on('pointerdown', (pointer) => {
            // Log the position of the cursor when clicked
            console.log('player position - X:', this.player.x, 'Y:', this.player.y);
        });

    }
    update(){
        if ((!this.physics.overlap(this.player, this.overlapArray)) && (this.playerEnteredTrigger == true)) {
            // Player left the trigger area, trigger the event
            this.playerEnteredTrigger = false;
            this.popUpBox.setVisible(false)
            this.popUpText.setVisible(false)
        }
        
        if(!this.uiScene.characterMovable){
            this.player.setVelocity(0,0)
            this.hair.setVelocity(0,0)
            this.shirt.setVelocity(0,0)
            this.player.play("idle",true)
            this.shirt.play("idles",true)
            this.hair.play("idleh",true)
            return;
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
            this.hair.setPosition(this.player.x,this.player.y)
            this.shirt.setPosition(this.player.x,this.player.y)
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
        let playerX=1433
        let playerY=2694
        this.player = this.physics.add.sprite(playerX, playerY, "player").setOrigin(0, 0)
        this.hair = this.physics.add.sprite(playerX, playerY, "hair").setOrigin(0, 0)
        this.shirt = this.physics.add.sprite(playerX, playerY, "shirt").setOrigin(0, 0)
    
        this.player.setBodySize(65,120)
        this.player.setMaxVelocity(this.playerSpeed)
        this.player.setBounce(0.2)
        this.hair.setMaxVelocity(this.playerSpeed)
        this.hair.setBodySize(65,120)
        this.hair.setBounce(0.2)
        this.hair.setTint(this.uiScene.hairColor)
        this.shirt.setMaxVelocity(this.playerSpeed)
        this.shirt.setBodySize(65,120)
        this.shirt.setBounce(0.2)
        this.shirt.setTint(this.uiScene.shirtColor) 
       // this.player.setPosition(1433, 2694)//this.player.setPosition(920, 2139)

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
        */

    }
}