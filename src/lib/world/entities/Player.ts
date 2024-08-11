import Loader from "../../etc/Loader";
import { Entity } from "./Entity";

export class Player extends Entity {
    public state = "front"
    public load() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        ctx.drawImage(Loader.get(`../public/assets/world/entity/shadow/shadow.png`), this.x, this.y + Math.floor(this.h/1.7))
        ctx.drawImage(Loader.get(`../public/assets/world/entity/player/${this.state}.png`), this.x, this.y)
    }
}