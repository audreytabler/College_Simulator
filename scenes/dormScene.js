import Phaser from 'phaser'


export class DormScene extends Phaser.Scene{
    constructor(){
        super({
            key: "DORM_SCENE"
        });
        this.cameras
        this.player
        this.playerSpeed = 400
        this.cursor
        this.targetBox

        this.wallsGroup;
    }
    create(){
        this.events.emit('sceneActivated', this);  

        this.scene.get("UI_SCENE").events.on('setTargetBox', () => {
            console.log("setting target box position")
            this.targetBox.setPosition(0,0)
        });       
        
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

        this.wallsGroup = this.physics.add.group();

    }
    update(){
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