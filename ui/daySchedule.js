import Phaser from 'phaser';



export class DaySchedule extends Phaser.GameObjects.Graphics {
    constructor(scene,clock) {
        super(scene, 'Phone');
        this.scene = scene;
        this.clock = clock;
        //js object: 24hr time, activity name, location
        this.mondayItems = [{time:10,name:"PYS",location:"107"},{time:11,name:"BIO",location:"102"}]


    }
}