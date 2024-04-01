import Phaser from "phaser";

export class NPC extends Phaser.GameObjects.Graphics {
    constructor(scene,x,y,name,skin) {
        this.scene = scene
        this.uiScene = scene.uiScene
        this.data = this.cache.json.get('dialog')
        this.numberArray = uiScene.numberArray
        this.dialogBox = this.uiScene.narrator
        this.name = name
        //this.socialScore = socialScore

        this.sprite = this.scene.physics.add.sprite(x, y, 'npcSpritesheet', skin).setOrigin(0,0); //where skin is number corresponding on spritesheet
        this.sprite.setBodySize(65,120)
       // this.sprite.setMaxVelocity(this.playerSpeed)
        this.sprite.setPipeline('Light2D')
    }
    preload(){
        this.load.json('dialog', "./assets/npcDialog.json")
        this.load.spritesheet('npcSpritesheet', "./assets/CharacterSpritesheet2.png", { frameWidth: 85, frameHeight: 150 })
    }
    spawnNPC(){
    }

    clicked(){
        let num = Math.floor(Math.random() * 21)
        if(!this.numberArray.includes(num)){
            this.numberArray.push(num)
            this.dialogBox.startDialogText(this.data.studentTips[num])
        }
    }
}