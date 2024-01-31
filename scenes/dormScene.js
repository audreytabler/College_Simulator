import Phaser from 'phaser'
import { SCENE_KEYS } from "./scene-keys";


export class DormScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENE_KEYS.DORM_SCENE
        });
        this.cameras
        this.player
        this.cursor
    }
}