import Phaser from 'phaser';

class PlayerStats extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene, 'PlayerStats');
        if (!PlayerStats.instance) {
            this.scene = scene;
            this.energyNum = 135 * 1;
            this.stressNum = 135 * 1;
            this.socialNum = 135 * 1;
            this.emptyBars;
            this.energyLevel;
            this.stressLevel;
            this.socialLevel;

            this.energyText;
            this.stressText;
            this.socialText;

            //this.newText = this.scene.add.text(0,0,'hello',{ fontSize: '16px', fill: 'white' });
            
            this.mask;

            PlayerStats.instance = this;
        }
        PlayerStats.instance.scene = scene
        this.initialDrawAllStats();
        return PlayerStats.instance;
    }

    updateEnergy(increment) {
        this.energyNum = this.energyNum + increment
        //this.energyLevel.createGeometryMask(this.emptyBars)
        if (this.energyNum > 135)
        this.energyNum = 135
        if (this.energyNum < 0){
            this.energyNum = 0
            return;
        }
        this.energyLevel.clear();
        this.energyLevel.setMask(this.mask)
        this.energyLevel.fillStyle(0xf0e68c, 1);
        this.energyLevel.fillRoundedRect(0, 0, this.energyNum, 20, (this.energyNum * 0.07));
    }

    updateStress(increment) {
        this.stressNum = this.socialNum + increment
        this.stressLevel.clear();
        this.stressLevel.fillStyle(0x8fbc8f, 1);
        this.stressLevel.setMask(this.mask)
        
        if(this.stressNum > 135)
            this.stressNum = 135
        if (this.stressNum <= 0)
            this.stressNum = 0

        this.stressLevel.fillRoundedRect(0, 0, this.stressNum, 20, (this.stressNum * 0.07));
    }

    updateSocial(increment) {
        this.socialNum = this.socialNum + increment
        this.socialLevel.clear();
        this.socialLevel.fillStyle(0x73a9c2, 1);
        this.socialLevel.setMask(this.mask)
        
        if(this.socialNum > 135)
            this.socialNum = 135
        if (this.socialNum <= 0)
            this.socialNum = 0

        this.socialLevel.fillRoundedRect(0, 0, this.socialNum, 20, (this.socialNum * 0.07));
    }

    updatePosition() {
        this.updateEnergy(-0.1)
        this.updateSocial(-0.2)

        const camera = this.scene.cameras.main;
        const x = camera.scrollX + 20; // Adjust as needed
        const y = camera.scrollY + 10; // Adjust as needed
        this.emptyBars.setPosition(x, y);
        this.energyLevel.setPosition(x, y);
        this.stressLevel.setPosition(x, y + 25);
        this.socialLevel.setPosition(x, y + 50);

        this.energyText.setPosition(x+7,y+2)
        this.energyText.setText('energy: ' + Math.round(this.energyNum/1.4) + '%')

        this.stressText.setPosition(x+7,y+27)
        this.stressText.setText('stress: ' + Math.round(this.stressNum/1.4) + '%')

        this.socialText.setPosition(x+7,y+52)
        this.socialText.setText('social: ' + Math.round(this.socialNum/1.4) + '%')
        //this.dialogText.setPosition(x+10,y+10)
    }

    initialDrawAllStats() {
        this.emptyBars = this.scene.add.graphics();
        this.emptyBars.fillStyle(0xFFFFFF, 0.7);
        this.emptyBars.fillRoundedRect(0, 0, 140, 20, 10); //blank energy
        this.emptyBars.fillRoundedRect(0, 25, 140, 20, 10); //blank stress
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

        //green stress bar
        this.stressLevel = this.scene.add.graphics();
        this.stressLevel.fillStyle(0x8fbc8f, 1);
        this.stressLevel.fillRoundedRect(0, 0, this.stressNum, 20, 10);
        
        this.stressLevel.setInteractive(new Phaser.Geom.Rectangle(7, 2, 140, 20, 10), Phaser.Geom.Rectangle.Contains);
        this.stressLevel.on('pointerover',() => {
            this.stressText.setVisible(true)
        });
        this.stressLevel.on('pointerout',() => {
            this.stressText.setVisible(false)
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
        this.stressText = this.scene.add.text(0,25,'debug text',{ fontSize: '16px', fill:'purple',blendMode: 'MULTIPLY' })
        this.socialText = this.scene.add.text(0,50,'debug text',{ fontSize: '16px', fill:'purple',blendMode: 'MULTIPLY' })
        this.energyText.setVisible(false)
        this.stressText.setVisible(false)
        this.socialText.setVisible(false)

        this.scene.events.on('update', this.updatePosition, this);
    }
}

export default PlayerStats;
