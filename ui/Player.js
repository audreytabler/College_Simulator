import Phaser from 'phaser';
import PlayerStats from './playerStats';

export class Player extends Phaser.GameObjects.Graphics {
    constructor(scene){
        super(scene, 'Player');
        if (!Player.instance) {
            Player.instance = this;

            this.scene.load.image("player", "./assets/circle.png")
            this.player = this.scene.physics.add.image((window.innerWidth / 2), (window.innerHeight / 2), "player").setOrigin(0, 0)
            this.player.setScale(0.2,0.2)
            this.player.setImmovable(true)
            this.player.body.allowGravity = false;
            this.player.setCollideWorldBounds(true)

            this.cursor = this.scene.input.keyboard.createCursorKeys()

            this.energy = 100;
            this.focus =20;
            this.happiness =100;

            this.playerSpeed = 200;
            this.targetItemInInventory = false;

            this.scene.cameras.main.startFollow(this,false,0.2,0.2);
            this.scene.events.on('update', this.update, this);
        }
        Player.instance.scene = scene
        return Player.instance;   
    }

    update(){
        const { left, right, up, down, } = this.cursor //would add up,down if overhead view
        const { W, A, S, D } = this.scene.input.keyboard.addKeys('W,A,S,D');
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

    }
}