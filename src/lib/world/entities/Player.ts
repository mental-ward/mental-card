import Loader from "../../etc/Loader";
import { Entity } from "./Entity";
const body = document.body
const dpr = window.devicePixelRatio
export class Player extends Entity {
    public state = "front"
    public draw() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        ctx.drawImage(Loader.get(`../public/assets/world/entity/player/${this.state}X4.png`), this.x, this.y)
    }
}