import Loader from "../../etc/Loader";
import { World } from "../World";
import { Entity } from "./Entity";
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

export class Npc extends Entity {
    public state = "front"
    public eventAvailability: boolean = false
    public eventType: string = ""
    public event: Function = () => {}
    public load() {
        ctx.drawImage(Loader.get(`../public/assets/world/entity/${this.name}/${this.state}.png`), this.x, this.y)
        
        // talk event
        if(this.eventType === "talk") {
            if(Math.abs(World.player.x - this.x) < 30 * 4 && Math.abs(World.player.y - this.y) < 30 * 4) {
                this.eventAvailability = true
                World.targetedEventer = this
                ctx.drawImage(Loader.get("../public/assets/world/entity/etc/E.png"), this.x + this.w/2 - 6 * 4 / 2, this.y - 13 * 4)
            } else {
                this.eventAvailability = false
            }
        }
    }
    public addEvent(eventType: string, event: Function) {
        this.eventType = eventType
        this.event = event
    }
    public moveTo() {
        
    }
}