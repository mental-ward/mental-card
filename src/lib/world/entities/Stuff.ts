import Loader from "../../etc/Loader"
import { Entity } from "./Entity"
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
export class Stuff extends Entity {
    public texturePath: string
    public x: number
    public y: number
    public w: number
    public h: number
    constructor(name: string, xywh: {x: number, y: number, w: number, h: number}, texturePath: string) {
        super(name, xywh)
        this.texturePath = texturePath
        this.x = xywh.x
        this.y = xywh.y
        this.w = xywh.w
        this.h = xywh.h
    }
    public load() {
        ctx.drawImage(Loader.get(this.texturePath), this.x, this.y)
    }
}