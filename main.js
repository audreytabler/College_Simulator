import './style.css'
import Phaser from 'phaser'
import DialogBox from './dialogBox.js'


class GameScene extends Phaser.Scene {
    //this constructor is basically side bar with all gameobjects in scene
    constructor() {
        super("scene-game");
        //gameObjects
        this.cameras
        this.player
        this.cursor

        //variables
        this.playerSpeed = 150

        //brainstorming idea: choose character type at beginning of game
        //ie gym type uses less energy at gym, academic studying decreases stress but social raises it more
        
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
        this.load.image("bg","/assets/bg.png")
        this.load.image("player","/assets/player.png")
        

    }

    create() {
        this.add.image(0,0,"bg").setOrigin(0,0)
        this.dialogBox = new DialogBox(this, 700, 100);
        console.log("Dialog box created at", this.dialogBox.dialogBox.x, this.dialogBox.dialogBox.y);
        this.showDialog("Welcome to the Game! Here is some more text yeah this should take a while to animate yepyep so much animation go brrrr");
        //this.dialogBox.show("Hello, adventurer!");

        //Align.scaleToGameW(bg, 2);

        //this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);
        //this.cameras.main.startFollow(this.player);

        this.cursor = this.input.keyboard.createCursorKeys()

        //player stuff
        this.player = this.physics.add.image((window.innerWidth/2),(window.innerHeight/2),"player").setOrigin(0,0)
        this.player.setImmovable(true)
        this.player.body.allowGravity=false;
        this.player.setCollideWorldBounds(true)
        //this.player.setSize(80,15).setOffset(10,70)
        
    }

    update() {
       // console.log('Player position:', this.player.x, this.player.y);
    const {left,right,up,down}=this.cursor //would add up,down if overhead view
    //player controls
    if(left.isDown)
      this.player.setVelocityX(-this.playerSpeed);
    else if(right.isDown)
      this.player.setVelocityX(this.playerSpeed);
    else if (up.isDown)
        this.player.setVelocityY(-this.playerSpeed)
    else if (down.isDown)
        this.player.setVelocityY(this.playerSpeed)
    else{
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      }
    }

    windowSizeChanged(width,height){
        console.log("WindowSizeChanged function has been called, width is " + width + " height is " + (height/2))
        //const newWidth = window.innerWidth;
        //const newHeight = window.innerHeight;

        // Update camera and player position based on the new window size
        //this.cameras.main.setBounds(0, 0, newWidth, newHeight);
        //this.cameras.main.centerOn(this.player.x, this.player.y);

        this.player.setPosition(width*0.5, height*0.5)
        /*if (height < 220 )
        this.player.setPosition((width*0.5),(height*0.8))
        else 
        this.player.setPosition((width*0.5),(height*0.5))*/
        //this.player.setPosition(width*0.5,(canvas.height*0.5))
    }

    showDialog(text) {
        this.dialogBox.show(text);
    
        // Example: Advance dialog on player input (e.g., spacebar)
        this.input.keyboard.once('keydown-SPACE', function () {
          this.dialogBox.hide();
          // Add logic to handle what happens next in the game
        }, this);
      }

    
    
}

window.onload = function () {
    const config = {
        type: Phaser.WEBGL,
        canvas: gameCanvas,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 50 },
                debug: true,
            },
        },
        scene: [GameScene],
    };

    const game = new Phaser.Game(config);

    //set initial game size
    game.canvas.width = window.innerWidth - 10;
    game.canvas.height = window.innerHeight - 10;

    //game canvas resize when user resizes browser window
    window.addEventListener('resize', function () {
        //console.log("Window resized! innerWidth is " + window.innerWidth + " window height is " + window.innerHeight)
        game.canvas.width = window.innerWidth - 10;
        game.canvas.height = window.innerHeight - 10;
        
        const activeScene = game.scene.getScene("scene-game");
        if (activeScene && activeScene.windowSizeChanged) {
            activeScene.windowSizeChanged(window.innerWidth - 10, window.innerHeight-10);
        }
    });
};