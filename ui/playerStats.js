import Phaser from 'phaser';

class PlayerStats extends Phaser.GameObjects.Graphics{
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

            PlayerStats.instance = this;
        }
        PlayerStats.instance.scene = scene
        this.initialDrawAllStats();
        return PlayerStats.instance;
    }

    updateEnergy(increment) {
        this.energyNum = this.energyNum + increment
        this.energyLevel.clear();

        if (this.energyNum > 15)
            this.energyLevel.fillRoundedRect(0, 0, this.energyNum, 20, 10);
    }
    updateSocial(increment) {
        this.socialNum = this.socialNum + increment
        this.socialLevel.clear();

        if (this.socialNum > 15)
            this.socialLevel.fillRoundedRect(0, 0, this.socialNum, 20, 10);
        else if (this.socialNum <=15 && this.socialNum >0)
        this.socialLevel.fillRoundedRect(0, 0, this.socialNum, 20, 10);
    }

    updatePosition() {
        const camera = this.scene.cameras.main;
        const x = camera.scrollX + 20; // Adjust as needed
        const y = camera.scrollY + 10; // Adjust as needed
        this.emptyBars.setPosition(x, y);
        this.energyLevel.setPosition(x, y);
        this.stressLevel.setPosition(x, y + 25);
        this.socialLevel.setPosition(x, y + 50);
        //this.dialogText.setPosition(x+10,y+10)
    }

    initialDrawAllStats() {
        this.emptyBars = this.scene.add.graphics();
        this.emptyBars.fillStyle(0xFFFFFF, 0.7);
        this.emptyBars.fillRoundedRect(0, 0, 140, 20, 10); //blank energy
        this.emptyBars.fillRoundedRect(0, 25, 140, 20, 10); //blank stress
        this.emptyBars.fillRoundedRect(0, 50, 140, 20, 10); //blank social

        //yellow energy level bar
        this.energyLevel = this.scene.add.graphics();
        this.energyLevel.fillStyle(0xf0e68c, 1);
        this.energyLevel.fillRoundedRect(0, 0, this.energyNum, 20, 10);

        //green stress bar
        this.stressLevel = this.scene.add.graphics();
        this.stressLevel.fillStyle(0x8fbc8f, 1);
        this.stressLevel.fillRoundedRect(0, 0, this.stressNum, 20, 10);
        //this.stressLevel.

        //blue social bar
        this.socialLevel = this.scene.add.graphics();
        this.socialLevel.fillStyle(0x73a9c2, 1);
        this.socialLevel.fillRoundedRect(0, 0, this.socialNum, 20, 10);

        this.scene.events.on('update', this.updatePosition, this);
    }
}

export default PlayerStats;
