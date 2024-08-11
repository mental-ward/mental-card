import { Entity } from "./Entity"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

export class Wall extends Entity{
    public load() {
        ctx.fillStyle = "#000"
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}