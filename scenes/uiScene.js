import Phaser from 'phaser';
//import { Clock } from '../Clock.js';

class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true }); // Make UIScene always active
    }

    create() {
        // Create the clock
        this.clock = new Clock(this);
    }

    update() {
        // Update the clock
        this.clock.update();
    }
}

// Define Clock class as shown in the previous example

// Your main game scene
class MyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MyScene' });
    }

    create() {
        // Your scene setup code
        
        // Transition to UIScene if not already active
        this.scene.launch('UIScene');
    }

    // Other methods for your scene
}


