import Phaser from 'phaser';

class MissionManager extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene, 'MissionManager');
        if (!MissionManager.instance) {
            MissionManager.instance = this;
            this.currentMission = 0;
            this.missionText = this.scene.add.text(0,0,'debug text',{ fontSize: '16px', fill:'black',blendMode: 'MULTIPLY' });
            this.criteria;
            this.targetBox;
            this.criteriaMet = false
            this.missionInProgress = false;

            this.scene.events.on('update', this.updatePosition, this);
        }
        MissionManager.instance.scene = scene
        return MissionManager.instance;

    }

    updatePosition(){
        const camera = this.scene.cameras.main;
        const x = camera.scrollX + 300; // Adjust as needed
        const y = camera.scrollY + 15; // Adjust as needed
        this.missionText.setPosition(x, y);
    }

    async startMission(m){
        console.log("mission " + m + " started")
        this.missionInProgress = true
        switch(m){
            case "take_shower":
                this.drawText("Current task: Take a warm shower")
                this.scene.targetBox.setPosition(450,2260) //= set target box position to shower

                //wait until player is within bounds of targetbox)
                await this.until(_ => this.criteriaMet == true);
                console.log("criteria met!")
                this.scene.narrator.startDialog()  
                break;
            case "find_dorm":
                this.drawText("Bring your items to your dorm (room #111)")
                this.scene.targetBox.setPosition(0,0) //= set target box position to front of dorm door
                this.criteria//check player inventory contains items
                break;
            case "meet_neighbors":
                    this.drawText("Meet your new neighbors!")
                    this.targetBox.setPosition(0,0) //= set target box position to front of dorm door
                    this.criteria//check player inventory contains items
                    break;
            case "find_dining hall":
                this.drawText("Follow your roommate to the dining hall")
                this.scene.targetBox.setPosition(0,0) //= set target box position to orientation
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

    setCriteriaMet(val){
        this.criteriaMet = val
    }

    until(conditionFunction) {
        const poll = resolve => {
          if(conditionFunction()) resolve();
          else setTimeout(_ => poll(resolve), 400);
        }
      
        return new Promise(poll);
      }




}
export default MissionManager;