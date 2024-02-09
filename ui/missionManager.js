import Phaser from 'phaser';

class MissionManager extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene, 'MissionManager');
        if (!MissionManager.instance) {
            MissionManager.instance = this;
            this.currentMission = 0;
            this.missionText = this.scene.add.text(0,0,'debug text',{ fontSize: '16px', fill:'white',blendMode: 'MULTIPLY' });
            this.criteria;
            this.targetBox;
            this.criteriaMet = false
            this.missionInProgress = false;
        }
        MissionManager.instance.scene = scene
        return MissionManager.instance;
    }

    updatePosition(){
        const camera = this.scene.cameras.main;
        const x = camera.scrollX + 20; // Adjust as needed
        const y = camera.scrollY + 10; // Adjust as needed
        this.missionText.setPosition(x, y);
    }

    startMission(m){
        this.missionInProgress = true
        switch(m){
            case "find_dorm":
                this.drawText("Bring your items to your dorm (room #111)")
                this.targetBox.setPosition(0,0) //= set target box position to front of dorm door
                this.criteria//check player inventory contains items
                break;
            case "meet_neighbors":
                    this.drawText("Meet your new neighbors!")
                    this.targetBox.setPosition(0,0) //= set target box position to front of dorm door
                    this.criteria//check player inventory contains items
                    break;
            case "find_dining hall":
                this.drawText("Follow your roommate to the dining hall")
                this.targetBox.setPosition(0,0) //= set target box position to orientation
                break;
        }

    }
    endMission(){
        //play checkbox animation next to current mission and then trigger next dialogue
        this.missionInProgress =false;
        this.missionText.setVisible(false)
    }
    drawText(text){
        this.missionText.setVisible(true)
        this.missionText.setText(text)
    }




}
export default MissionManager;