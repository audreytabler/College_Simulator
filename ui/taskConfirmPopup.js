import Phaser from "phaser";

export class TaskConfirm extends Phaser.GameObjects.Graphics {
    constructor(scene,clock) {
        super(scene, 'taskConfirm');
        this.scene = scene
        this.clock = clock
        this.shadedBG;
        this.numHours;
        this.numHoursText;
        this.text;
        this.upArrow
        this.downArrow;
        this.decorContainer;
        this.arrows
        this.confirm;
        this.cancel;

        this.isHours = true

        this.action
        this.setUpDisplay()
    }
    display(isHours){
        this.isHours = isHours
        if(isHours){
        this.numHours = 1
        this.text.setText(("How many hours would you like to "+this.action+" for?"))
        }
        if(!isHours){
            this.numHours = 15
            this.text.setText(("How many minutes would you like to "+this.action+" for?"))    
        }
        
        this.shadedBG.setVisible(true)
        this.text.setVisible(true)
        this.numHoursText.setText(this.numHours)
        this.numHoursText.setVisible(true)
        this.upArrow.setVisible(true)
        this.downArrow.setVisible(true)
        this.arrows.setVisible(true)
        this.confirm.setVisible(true)
        this.cancel.setVisible(true)
        this.decorContainer.setVisible(true)
    }

    hide(){
        this.shadedBG.setVisible(false)
        this.text.setVisible(false)
        this.numHoursText.setText("")
        this.upArrow.setVisible(false)
        this.downArrow.setVisible(false)
        this.arrows.setVisible(false)
        this.cancel.setVisible(false)
        this.confirm.setVisible(false)
        this.decorContainer.setVisible(false)
    }
    setUpDisplay(){
        this.shadedBG = this.scene.add.graphics();
        this.shadedBG.fillStyle(0x2F2E30, 0.6); 
        this.shadedBG.fillRoundedRect(700, 30, 300, 250,15);
        this.decorContainer = this.scene.add.container(0,0)
        this.cancel = this.scene.add.rectangle(970,60,30,30,0x465A7F).setInteractive()
        this.cancel.toString = function() {
            // Customize the output based on your requirements
            return "clickable box";
        };
        this.confirm = this.scene.add.rectangle(950,230,50,50,0x465A7F).setInteractive()
        this.confirm.toString = function() {
            // Customize the output based on your requirements
            return "clickable box";
        };
        this.arrows = this.scene.make.text({x:936,y:215,text:'✓',style: {font: '40px Courier New',fill: 'white',style: 'bold',}})
        this.decorContainer.add(this.arrows)
        this.arrows = this.scene.make.text({x:960,y:40,text:'x',style: {font: '35px Courier New',fill: 'white',style: 'bold',}})
        this.decorContainer.add(this.arrows)
        this.text = this.scene.make.text({
            x: 710,
            y: 40,
            text: 'How many hours would you like to sleep?',
            origin: { x: 0, y: 0},
            style: {
                font: '35px Courier New',
                fill: 'white',
                style: 'bold',
                wordWrap: { width: 295 }
            }
        });

        this.numHoursText=this.scene.make.text({
            x: 780,
            y: 190,
            text: '10',
            origin: { x: 0, y: 0},
            style: {font: '80px Courier New',fill: 'white',style: 'bold',wordWrap: { width: 295 }
            }
        });
        this.upArrow = this.scene.add.circle(750,205,15,0x465A7F).setInteractive()//this.scene.add.rectangle(850,200,35,35,0x9BD9AC).setInteractive();
        this.arrows= this.scene.make.text({x:734,y:188,text:'⏶',style: {font: '35px Courier New',fill: 'white',style: 'bold',}})
        this.decorContainer.add(this.arrows)
        this.decorContainer.setDepth(1)
        this.upArrow.toString = function() {
            // Customize the output based on your requirements
            return "clickable box";
        };
        this.upArrow.on('pointerdown', () => {
            //increment num hours by 1 
            if(this.numHours <=12)
            this.numHours++;
            this.numHoursText.setText(this.numHours)
        });
        this.cancel.on('pointerdown', () => {
            this.hide()
        });
        this.confirm.on('pointerdown', () => {
            this.confirmTask()
        });

        this.downArrow = this.scene.add.circle(750,240,15,0x465A7F).setInteractive()//this.scene.add.rectangle(850,250,35,35,0xD69D80).setInteractive();
        this.arrows= this.scene.make.text({x:734,y:225,text:'⏷',style: {font: '35px Courier New',fill: 'white',style: 'bold',}})
        this.downArrow.toString = function() {
            // Customize the output based on your requirements
            return "clickable box";
        };
        this.downArrow.on('pointerdown', () => {
            if(this.numHours>0)
                this.numHours--;
            this.numHoursText.setText(this.numHours)
            //increment num hours by -1
        });
        

        this.hide()
    }

    confirmTask(){
        this.hide();
        let statIncrement =0;
        
        if(this.isHours){
            statIncrement = 14 * this.numHours;
            this.scene.clock.advanceTime(this.numHours * 60)
        }
        else{
            statIncrement = 0.6 * this.numHours;
            this.scene.clock.advanceTime(this.numHours)
        }
        if(this.action === "sleep"){ //increase energy by 12.5 per hour slept
            this.scene.statsOverlay.updateEnergy(statIncrement)
        }
        if(this.action === "study"){ //decrease focus, but increase academic score
            this.scene.statsOverlay.updateFocus(-statIncrement)
            this.scene.statsOverlay.updateEnergy(-statIncrement)
            //increase academic score when added
        }
        if(this.action === "chat"){ 
            this.scene.statsOverlay.updateSocial(statIncrement)
            this.scene.statsOverlay.updateEnergy(-statIncrement)
        }
        if(this.action === "text friend"){ 
            this.scene.statsOverlay.updateSocial(statIncrement)
            this.scene.statsOverlay.updateEnergy(-statIncrement)
        }
        if(this.action === "scroll on social media"){ 
            this.scene.statsOverlay.updateSocial(statIncrement*0.5)
            this.scene.statsOverlay.updateFocus(statIncrement*0.5)
            this.scene.statsOverlay.updateEnergy(-statIncrement)
        }
        if(this.action === "view flash cards"){ 
            this.scene.statsOverlay.updateFocus(-statIncrement)
            //increase academic score
            this.scene.statsOverlay.updateEnergy(-statIncrement*0.5)
        }
    }
}

export default TaskConfirm