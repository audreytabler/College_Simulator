import Phaser from 'phaser'

export class PlayerStats{
    constructor(scene, energy,stress,social) {
        this.scene = scene
        this.energyNum = 135 *energy
        this.stressNum = 135 *stress
        this.socialNum = 135 *social

        this.emptyBars = scene.add.graphics();
        this.emptyBars.fillStyle(0xFFFFFF, 0.7);
        this.emptyBars.fillRoundedRect(0, 0, 140, 20,10); //blank energy
        this.emptyBars.fillRoundedRect(0, 25, 140, 20,10); //blank stress
        this.emptyBars.fillRoundedRect(0, 50, 140, 20,10); //blank social

        //yellow energy level bar
        this.energyLevel = scene.add.graphics();
        this.energyLevel.fillStyle(0xf0e68c, 1); 
        this.energyLevel.fillRoundedRect(0, 0, 100, 20,10);
        
        //green stress bar
        this.stressLevel = scene.add.graphics();
        this.stressLevel.fillStyle(0x8fbc8f, 1); 
        this.stressLevel.fillRoundedRect(0, 0, 15, 20,10);
        
        //blue social bar
        this.socialLevel = scene.add.graphics();
        this.socialLevel.fillStyle(0x73a9c2, 1); 
        this.socialLevel.fillRoundedRect(0, 0, 100, 20,10);

        this.scene.events.on('update', this.updatePosition, this);
        
    }
    drawEnergy() {
        this.energyLevel.clear();

        // Draw the health portion based on the variable value
        this.energyLevel.fillRoundedRect(0, 0, this.energyNum, 20,10);
    }

    updatePosition() {
        const camera = this.scene.cameras.main;
        const x = camera.scrollX +20; // Adjust as needed
        const y = camera.scrollY +10; // Adjust as needed
        this.emptyBars.setPosition(x, y);
        this.energyLevel.setPosition(x, y);
        this.stressLevel.setPosition(x, y+25);
        this.socialLevel.setPosition(x, y+50);
        //this.dialogText.setPosition(x+10,y+10)
      }

}
export default PlayerStats