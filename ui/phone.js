import Phaser from 'phaser';
import Clock from '../ui/clock.js'


export class Phone extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene, 'Phone');
        this.scene = scene;
        this.clock;
        this.isPhoneFocused = false;

        // Create phone components
        this.createPhoneComponents();
        // Set up interactivity
        this.setupInteractivity();
    }

    createPhoneComponents() {
        this.phoneEdge = this.scene.add.rectangle(130,400,180,310,0x808080)
        this.phoneEdge.setInteractive()
        this.phoneScreen = this.scene.add.rectangle(130,390,150,260,0xffffff);
        this.phoneScreen.setInteractive()

        this.homeButton =  this.scene.add.rectangle(130,537,25,25,0x000000);
        this.reminders = this.scene.add.rectangle(100,350,35,35,0x226184);
        this.reminders.setInteractive
        this.social = this.scene.add.rectangle(150,350,35,35,0x36B540);
        this.social.setInteractive
        this.game = this.scene.add.rectangle(100,400,35,35,0x98F5F9);
        this.game.setInteractive


        this.clock = new Clock(this.scene,this.scene.time.now);
        this.clock.clockText.setPosition(75,285)
        this.clock.dayWeekText.setPosition(95,265)
        // Initially unfocus the phone
      this.unfocusPhone();
    }

    setupInteractivity() {
        this.scene.input.on('pointerdown', (pointer, gameObject) => {
            if (gameObject.toString() == "[object Object]") {
                if (!this.isPhoneFocused) 
                    this.focusPhone();
            } 
            else {
                if(this.isPhoneFocused)
                    this.unfocusPhone();
            }
        });


        // Add click handler for the phone's home button
        this.homeButton.on('pointerdown', () => {
                // Toggle between home screen and app screen
                this.isHomeScreenVisible ? this.hidePhoneComponents() : this.showHomeScreen();
        });

    }

    focusPhone() {
        // Animate the phone to focus position
        this.scene.tweens.add({
            targets: [this.phoneEdge, this.phoneScreen,this.homeButton,this.clock.clockText,this.clock.dayWeekText,this.reminders,this.social,this.game],
            y: '-=250',
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.isPhoneFocused = true;
            }
        });
    }

    unfocusPhone() {
        // Animate the phone to unfocus position
        this.scene.tweens.add({
            targets: [this.phoneEdge, this.phoneScreen,this.homeButton,this.clock.clockText,this.clock.dayWeekText,this.reminders,this.social,this.game],
            y: '+=250',
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.isPhoneFocused = false;
            }
        });
    }

}
export default Phone;