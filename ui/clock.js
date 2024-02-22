import Phaser from 'phaser';


export class Clock extends Phaser.GameObjects.Graphics {
    constructor(scene, initialTime) {
        super(scene,'Clock');
        this.scene = scene;
        this.time = { hour: 7, minute: 30, period: 'AM' }; // Initial time is 7:30 AM
        this.timeScale = 0.01; // 0.7 real seconds per in-game minute
        this.clockText = null;
        this.deltaTime;
        this.start = initialTime;

        // Create a text object to display the clock
        this.clockText = this.scene.add.text(10, 10, this.getTimeString(), { font: '24px Arial', fill: '#ffffff' });
    }

    
    // Function to update the clock time
    update() {
        //this.deltaTime= this.scene.time.now
        // Update the time based on the time scale
        const deltaTime = (this.scene.time.now - this.start)/ 10000; // Convert deltaTime to seconds
        //console.log("delta time is: " + deltaTime + " current time is " + this.scene.time.now )
        const minutesPassed = deltaTime * this.timeScale;
        this.advanceTime(minutesPassed);
        
        // Update the clock display
        this.clockText.setText(this.getTimeString());
        this.updatePosition()
       // console.log("total minutes is " + this.time.minute.toString().padStart(2, '0'))
    }
    updatePosition(){
        const camera = this.scene.cameras.main;
        const x = camera.scrollX + 850; // Adjust as needed
        const y = camera.scrollY + 15; // Adjust as needed
        this.clockText.setPosition(x, y);
    }

    // Function to advance the time by a certain number of minutes
    advanceTime(minutes) {
        // Convert minutes to hours and minutes
        const totalMinutes = this.time.hour * 60 + this.time.minute + minutes;
        //console.log("minutes is " + Math.round(totalMinutes))
        this.time.hour = Math.floor(totalMinutes / 60) % 12 || 12; // Ensure hour is between 1 and 12
        this.time.minute = totalMinutes % 60;

        // Determine the period (AM or PM)
        this.time.period = totalMinutes < 720 ? 'AM' : 'PM';
    }

    // Function to format the time as a string
    getTimeString() {
        const minuteRounded = Math.round(this.time.minute)
        const hourString = this.time.hour.toString().padStart(2, '0');
        const minuteString = minuteRounded.toString().padStart(2, '0');
        return `${hourString}:${minuteString} ${this.time.period}`;
    }
}

export default Clock;