import Phaser from 'phaser'
import { SCENE_KEYS } from "./scene-keys";


export class CampusScene extends Phaser.Scene{
    constructor(){
        super({
            key: SCENE_KEYS.CAMPUS_SCENE
        });
    }
}