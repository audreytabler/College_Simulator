import Phaser from 'phaser'



export class TestScene extends Phaser.Scene{
    constructor(){
        super({
            key: "TEST_SCENE"
        });
        this.cameras
        this.player
        this.cursor
        this.spritesheet;
        this.spritesheet;
        this.texSnap
    }
    preload(){
        this.load.image("playerBase","/assets/CharacterSpriteSheet2.png")
        this.load.image("hair1","/assets/CharacterSpriteHair1.png")
        this.spritesheet = this.load.spritesheet("playerSpritesheet", "/assets/CharacterSpriteSheet.png", { frameWidth: 85, frameHeight: 150 });
        //size of entire image: 425,915
    }
    create() {
        /*
        // Create a render texture
       // this.add.image(0,0,"hair1")
        var rt = this.make.renderTexture({ width: 425, height: 915 });
    
        // Draw the playerBase sprite onto the render texture
        rt.draw("playerBase", 0, 0).setOrigin(0, 0);
    
        // Draw the hair1 sprite onto the render texture
        rt.draw("hair1", 0, 0).setOrigin(0, 0);
    
        // Save the render texture as a new texture with a unique key
        var texture = rt.saveTexture("playerTexture");
       // this.spritesheet.setTexture("playerTexture")
        this.player = this.physics.add.sprite(0, 0, "playerSpritesheet").setOrigin(0, 0);
        
        //texture.texturem
       // var snapshotSprite;
        
        this.texSnap = texture.snapshot(function(snapshotImage) {
            // This function gets called when the snapshot is complete
            console.log("Snapshot taken!");
            return(snapshotImage)
        
            // You can perform additional actions here, such as displaying the snapshot
            //snapshotSprite = this.add.image(0, 0, snapshotImage);
        });*/

        /*

        rt.setVisible(false)
        this.addImage(texSnap)*/
        
        
        //this.load.image("texSnap",texSnap)
        //this.texture.getFrameTexture()
        //var frameTexture = this.texture.getFrameTexture("playerTexture");
        //console.log(frameTexture.source[0].image.src)
    
        
        //this.load.spritesheet("playerSpritesheet", texSnap, { frameWidth: 85, frameHeight: 150 });
        
    
        // Create a sprite using the loaded spritesheet
        
        //console.log(this.player.width)
    }

    addImage(img){
        this.load.image(0,0,img).setOrigin(0,0)
    }
    update(){
        this.load.spritesheet("playerSpritesheet", this.texSnap, { frameWidth: 85, frameHeight: 150 });
        
        //this.player = this.physics.add.sprite(0, 0, "playerSpritesheet").setOrigin(0, 0);
    }
}