import Phaser from 'phaser';

class PlayerStats extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene, 'PlayerStats');
        this.scene = scene;
        this.energyNum = 135 * 1;
        this.focusNum = 4;
        this.socialNum = 135 * 1;
        this.emptyBars;
        this.energyLevel;
        this.focusLevel;
        this.socialLevel;

        this.energyText;
        this.focusText;
        this.socialText;

        //this.newText = this.scene.add.text(0,0,'hello',{ fontSize: '16px', fill: 'white' });
        
        this.mask;

        this.initialDrawAllStats();
        return PlayerStats.instance;
    }

    updateEnergy(increment) {
        this.energyNum = this.energyNum + increment
        //this.energyLevel.createGeometryMask(this.emptyBars)
        if (this.energyNum > 140)
        this.energyNum = 140
        if (this.energyNum < 0){
            this.energyNum = 0
            return;
        }
        this.energyLevel.clear();
        this.energyLevel.setMask(this.mask)
        this.energyLevel.fillStyle(0xf0e68c, 1);
        this.energyLevel.fillRoundedRect(0, 0, this.energyNum, 20, (this.energyNum * 0.07));
    }

    updateFocus(increment) {
        this.focusNum = this.focusNum + increment
        this.focusLevel.clear();
        this.focusLevel.fillStyle(0x8fbc8f, 1);
        this.focusLevel.setMask(this.mask)

        //const redColor = new Phaser.Display.Color(255, 0, 0);
        //const greenColor = new Phaser.Display.Color(0, 255, 0);

    // Interpolate between red and green based on fill level
    //const interpolatedColor = Phaser.Display.Color.Interpolate.ColorWithColor(redColor, greenColor, 100, Math.round(this.focusNum / 1.4));//Math.round(this.focusNum/1.4) *0.01);
    //const interpolatedColor = Phaser.Display.Color.Interpolate.ColorWithColor(0xff0000, 0x00ff00, 100, 50);    
   // console.log("interpolated color is " + interpolatedColor.color.toString())

    // Set the bar color to the interpolated color
        //this.focusLevel.fillStyle(interpolatedColor.color, 1);
        
        if(this.focusNum > 140)
            this.focusNum = 140
        if (this.focusNum <= 0)
            this.focusNum = 0
       // if (this.focusNum >= 100)
          //  this.focusNum = 100

        this.focusLevel.fillRoundedRect(0, 0, this.focusNum, 20, (this.focusNum * 0.07));
    }

    updateSocial(increment) {
        this.socialNum = this.socialNum + increment
        this.socialLevel.clear();
        this.socialLevel.fillStyle(0x73a9c2, 1);
        this.socialLevel.setMask(this.mask)
        
        if(this.socialNum > 140)
            this.socialNum = 140
        if (this.socialNum <= 0)
            this.socialNum = 0

        this.socialLevel.fillRoundedRect(0, 0, this.socialNum, 20, (this.socialNum * 0.07));
    }

    updatePosition() {
        ///////
        this.updateEnergy(-0.05)
        //this.updateFocus(1)
        //this.updateSocial(-0.2)
        //////

        const camera = this.scene.cameras.main;
        const x = camera.scrollX + 20; // Adjust as needed
        const y = camera.scrollY + 10; // Adjust as needed
        this.emptyBars.setPosition(x, y);
        this.energyLevel.setPosition(x, y);
        this.focusLevel.setPosition(x, y + 25);
        this.socialLevel.setPosition(x, y + 50);

        this.energyText.setPosition(x+7,y+2)
        this.energyText.setText('energy: ' + Math.round(this.energyNum/1.4) + '%')

        this.focusText.setPosition(x+7,y+27)
        this.focusText.setText('focus: ' + Math.round(this.focusNum/1.4) + '%')

        this.socialText.setPosition(x+7,y+52)
        this.socialText.setText('social: ' + Math.round(this.socialNum/1.4) + '%')
        //this.dialogText.setPosition(x+10,y+10)
    }

    initialDrawAllStats() {
        this.emptyBars = this.scene.add.graphics();
        this.emptyBars.fillStyle(0xFFFFFF, 0.7);
        this.emptyBars.fillRoundedRect(0, 0, 140, 20, 10); //blank energy
        this.emptyBars.fillRoundedRect(0, 25, 140, 20, 10); //blank focus
        this.emptyBars.fillRoundedRect(0, 50, 140, 20, 10); //blank social
        this.mask = this.emptyBars.createGeometryMask();

        //yellow energy level bar
        this.energyLevel = this.scene.add.graphics();
        this.energyLevel.fillStyle(0xf0e68c, 1);
        this.energyLevel.fillRoundedRect(0, 0, this.energyNum, 20, 10);
        //this.energyLevel.createGeometryMask(this.emptyBars)
        this.energyLevel.setMask(this.mask)
        this.energyLevel.setInteractive(new Phaser.Geom.Rectangle(7, 2, 140, 20, 10), Phaser.Geom.Rectangle.Contains);
        this.energyLevel.on('pointerover',() => {
            this.energyText.setVisible(true)
        });
        this.energyLevel.on('pointerout',() => {
            this.energyText.setVisible(false)
        });

        //green focus bar
        this.focusLevel = this.scene.add.graphics();
        this.focusLevel.fillStyle(0x8fbc8f, 1);
        this.focusLevel.fillRoundedRect(0, 0, this.focusNum, 20, 10);
        
        this.focusLevel.setInteractive(new Phaser.Geom.Rectangle(7, 2, 140, 20, 10), Phaser.Geom.Rectangle.Contains);
        this.focusLevel.on('pointerover',() => {
            this.focusText.setVisible(true)
        });
        this.focusLevel.on('pointerout',() => {
            this.focusText.setVisible(false)
        });

        //blue social bar
        this.socialLevel = this.scene.add.graphics();
        this.socialLevel.fillStyle(0x73a9c2, 1);
        this.socialLevel.fillRoundedRect(0, 0, this.socialNum, 20, 10);
        //this.socialLevel.fillRoundedRect(0, 0, 10, 20, 10-(10*0.7));
        this.socialLevel.setInteractive(new Phaser.Geom.Rectangle(7, 3, 140, 20, 10), Phaser.Geom.Rectangle.Contains);
        this.socialLevel.on('pointerover',() => {
            this.socialText.setVisible(true)
        });
        this.socialLevel.on('pointerout',() => {
            this.socialText.setVisible(false)
        });

        this.energyText = this.scene.add.text(0,0,'debug text',{ fontSize: '16px', fill:'purple',blendMode: 'MULTIPLY' });
        this.focusText = this.scene.add.text(0,25,'debug text',{ fontSize: '16px', fill:'purple',blendMode: 'MULTIPLY' })
        this.socialText = this.scene.add.text(0,50,'debug text',{ fontSize: '16px', fill:'purple',blendMode: 'MULTIPLY' })
        this.energyText.setVisible(false)
        this.focusText.setVisible(false)
        this.socialText.setVisible(false)

        this.updateFocus(0)
        this.updateEnergy(0)
        this.updateSocial(0)

        this.scene.events.on('update', this.updatePosition, this);
    }
}

export default PlayerStats;
