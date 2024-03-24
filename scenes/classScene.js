import Phaser from 'phaser'


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
        
        //tilemap
        this.load.image("tiles","/assets/CollegeTileSet.png")
        this.load.tilemapTiledJSON("classMap", "/assets/ClassMap.tmj")

    }
    create(){
        
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
        wallLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, wallLayer);
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
        /////////////
        const roomNumLayer = map.getObjectLayer("RoomNumbers"); 

        roomNumLayer.objects.forEach(object => {
            const roomRect = this.add.rectangle(object.x, object.y, object.width, object.height);
            roomRect.setOrigin(0); // Make collisions based on top-left corner
            roomRect.setAlpha(0); // Keep it invisible
            this.physics.add.existing(roomRect, true);

            this.physics.add.overlap(this.player, roomRect, () => {
                this.usableObject = object.properties.find(prop => prop.name === 'roomNumber').value
                this.playerEnteredTrigger = true
                this.popUpText.setVisible(true)
                this.popUpBox.setVisible(true)
                this.popUpBox.width=(this.usableObject.toString().length * 15)
                this.popUpText.setText(this.usableObject)
                this.popUpText.setPosition(roomRect.x,roomRect.y)
                this.popUpBox.setPosition(roomRect.x+30,roomRect.y+15)
            });
        });   
        this.popUpBox = this.add.rectangle(8159+50, 5305+20, 75, 30,0x226184,0.5).setInteractive()
        this.popUpBox.setVisible(false)
        this.popUpText = this.add.text(8159, 5305, " " + (this.usableObject), { 
            fontFamily: 'sans-serif', 
            fontSize: '24px', 
            color: '#ffffff',
        });  
        
        this.input.on('pointerdown', (pointer) => {
            // Log the position of the cursor when clicked
            console.log('player position - X:', this.player.x, 'Y:', this.player.y);
        });

    }
    update(){
        if ((!this.physics.overlap(this.player, this.overlapArray)) && (this.playerEnteredTrigger == true)) {
            // Player left the trigger area, trigger the event
            this.playerEnteredTrigger = false;
        }
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
        }
    
    }

    loadPlayer(){

        this.player = this.physics.add.sprite(0, 0, "player").setOrigin(0, 0)
        this.player.setPosition(1433, 2694)//this.player.setPosition(920, 2139)
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