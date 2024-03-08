import Phaser from 'phaser';


export class Clock extends Phaser.GameObjects.Graphics {
    constructor(scene, initialTime) {
        super(scene,'Clock');
        this.scene = scene;
        this.time = { hour: 7, minute: 30, period: 'AM' }; // Initial time is 7:30 AM
        this.timeScale = 0.001; // 0.7 real seconds per in-game minute
        this.clockText = null;
        this.deltaTime;
        this.start = initialTime;
        this.numDays =1
        this.totalHours = 7;

        // Create a text object to display the clock
        this.clockText = this.scene.add.text(15, 800, this.getTimeString(), { font: '24px Arial', fill: '#000000' });
            const camera = this.scene.cameras.main;
            const x = camera.scrollX + 850; // Adjust as needed
            const y = camera.scrollY + 15; // Adjust as needed
            this.clockText.setPosition(x, y);

    }

    
    // Function to update the clock time
    update() {
        const deltaTime = (this.scene.time.now - this.start); // Convert deltaTime to seconds
        const minutesPassed = deltaTime * this.timeScale;
        this.advanceTime(minutesPassed);

        if (this.totalHours >= 24 ) {
            this.numDays++; // Increment numDays
            this.totalHours =0
            this.time.hour=12
            this.time.minute=0
        }
        // Update the clock display
        this.clockText.setText(this.getTimeString());
        this.start = this.scene.time.now
    }


    // Function to advance the time by a certain number of minutes
    advanceTime(minutes) {
        // Convert minutes to hours and minutes
        const totalMinutes = this.time.hour * 60 + this.time.minute + minutes;
        const totalHoursMins = this.totalHours * 60 + this.time.minute + minutes;
        this.totalHours = Math.floor(totalHoursMins / 60)
        //console.log("total hours is " + this.totalHours)
        this.time.hour = Math.floor(totalMinutes / 60) % 12 || 12; // Ensure hour is between 1 and 12
        this.time.minute = totalMinutes % 60;

        // Determine the period (AM or PM)
        //this.time.period = totalMinutes < 720 ? 'AM' : 'PM';
        this.time.period = this.totalHours < 12 ? 'AM' : 'PM';
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