import Phaser from 'phaser'


export class DormScene extends Phaser.Scene{
    constructor(){
        super({
            key: "DORM_SCENE"
        });
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
        this.load.image("bg", "/assets/dormBG.png")
        this.load.spritesheet('player', 'assets/CharacterSpritesheet.png', { frameWidth: 85, frameHeight: 150 });
        this.load.image("popUp", "/assets/enter.png")
        
        //tilemap
        this.load.image("tiles","/assets/TX TilesetCombo.png")
        this.load.tilemapTiledJSON("testMap", "/assets/TileTest2.tmj")

    }
    create(){
        
        this.scene.get("UI_SCENE").newScene(this.sys.settings.key)
        this.uiScene = this.scene.get("UI_SCENE")

        this.physics.world.enable;
        this.physics.world.setBounds(0, 0, 9035, 6347);
        this.input.enabled = true;
        this.cursor = this.input.keyboard.createCursorKeys()


        //TILEMAP STUFF
        let map = this.make.tilemap({key: 'testMap'})
        let grassTileset = map.addTilesetImage("TX TilesetCombo","tiles")

        let groundlayer = map.createLayer("ground",grassTileset)
        let wallLayer = map.createLayer("building",grassTileset)

        //COLLISION WITH WALLS STUFF
        this.player()
        wallLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, wallLayer);
        //////////////////
            //testing map.getObjectLayer stuff
        //const transportationLayer = map.getObjectLayer("transportation")//.objects[0];
        const transportLayer = map.getObjectLayer("transportation"); 

        transportLayer.objects.forEach(object => {
            //if (object.type === 'transportTrigger') {
                console.log(object)
                console.log(object.x)
                const transportRect = this.add.rectangle(object.x, object.y, object.width, object.height);
                transportRect.setOrigin(0); // Make collisions based on top-left corner
                transportRect.setAlpha(0); // Keep it invisible
                this.physics.add.existing(transportRect, true);

                this.physics.add.overlap(this.player, transportRect, () => {
                    console.log("player overlaps")
                    //this.scene.start('newSceneKey'); // put the object.scenekey in there
                });
            //}
        });
       // this.physics.add.existing(transportationLayer, true);
       // console.log(transportationLayer)

       // this.physics.add.overlap(this.player, transportationLayer, () => {
           // if (!this.playerEnteredTrigger) {
                // Player entered the trigger area for the first time, trigger the event
               // this.playerEnteredTrigger = true; // Set the flag to true
               // console.log("player entered target box")
               // this.popUp.setVisible(true)
               // this.missionManager.setCriteriaMet(true)
                // this.triggerEvent();
           // }

        //});
        //this.physics.add.collider()




        ///////////////////

        this.scene.get("UI_SCENE").events.on('setTargetBox', () => {
            console.log("setting target box position")
            this.targetBox.setPosition(0,0)
        });       
        
        this.targetBox = this.add.rectangle(100, 100, 365, 100, 0x000000, 0); // Invisible rectangle trigger area
        this.targetBox.setPosition(940,2450) 
        this.physics.add.existing(this.targetBox, true);

        this.popUp = this.add.image(940,2070,'popUp')
        this.popUp.setInteractive()
        this.popUp.setVisible(false)
        this.popUp.on('pointerdown',()=> {this.uiScene.narrator.disableClicks(); this.sceneActive=false; this.scene.stop("DORM_SCENE"); this.scene.start("CAMPUS_SCENE");})
        

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

        this.wallsGroup = this.physics.add.group();
        this.input.on('pointerdown', (pointer) => {
            // Log the position of the cursor when clicked
            console.log('player position - X:', this.player.x, 'Y:', this.player.y);
        });

    }
    update(){
        //const playerx = this.player.get.x
        this.popUp.setPosition(this.player.x+40,this.player.y-35)

        if ((!this.physics.overlap(this.player, this.targetBox)) && (this.playerEnteredTrigger == true)) {
            // Player left the trigger area, trigger the event
            this.playerEnteredTrigger = false; // Set the flag to false
            this.popUp.setVisible(false)
            console.log("player left area");
            //this.missionManager.setCriteriaMet(false)
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

    player(){

        this.player = this.physics.add.sprite(0, 0, "player").setOrigin(0, 0)
        this.player.setPosition(0, 400)//this.player.setPosition(920, 2139)
        this.player.body.allowGravity = false;
        this.player.setBodySize(65,120)
        this.player.setCollideWorldBounds(true)

        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
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

    }
}