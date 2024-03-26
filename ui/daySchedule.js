import Phaser from 'phaser';



export class DaySchedule extends Phaser.GameObjects.Graphics {
    constructor(scene,clock) {
        super(scene, 'Phone');
        this.scene = scene;
        this.clock = clock;
        //js object: 24hr time, activity name, location
        this.mondayItems = [{time:10,name:"PYS",location:"107"},{time:11,name:"BIO",location:"102"},{time:13,name:"ENG",location:"105"}]
        this.tuesdayItems = [{time:11,name:"SCI",location:"107"}]
        this.wednesdayItems = []
        this.thursdayItems = []
        this.fridayItems =[]
        this.saturdayItems=[]
        this.sundayItems=[]

        this.currentDayItems

        this.hasShowered = false
        this.recommendedStudy=1
        this.timeStudiedThisWeek
        //hadBreakfast
        //hadLunch
        //hadDinner

        //went to class
        //went to all classes
        //did all activities
        //completed set amount of studying
        //star rating for each day?

    }
    newDay(day){
        this.hasShowered=false
        this.currentDayItems =[]
        if(day =="sunday"){
            this.currentDayItems = this.sundayItems
        }
        if(day =="monday"){
            this.currentDayItems = this.mondayItems
        }
        if(day =="tuesday"){
            this.currentDayItems = this.tuesdayItems
        }
        if(day =="wednesday"){
            this.currentDayItems = this.wednesdayItems
        }
        if(day =="thursday"){
            this.currentDayItems = this.thursdayItems
        }
        if(day =="friday"){
            this.currentDayItems = this.fridayItems
        }
        if(day =="saturday"){
            this.currentDayItems = this.saturdayItems
        }
    }
    newWeek(){

    }

}