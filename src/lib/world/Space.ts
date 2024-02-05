import { Obstacle } from "./entities/Obstacle";
const body = document.body
const dpr = window.devicePixelRatio
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
export class Space {
    private linkedSpace: Array<Space> = []
    private backgroundImage: HTMLImageElement
    private entities: Array<Obstacle>
    constructor(backgroundImage: HTMLImageElement, entities: Array<Obstacle>, linkedSpace?: Array<Space>) {
        this.backgroundImage = backgroundImage
        this.entities = entities
        if(linkedSpace) {
            this.linkedSpace = linkedSpace
        }
    }
    public draw() {
        ctx.drawImage(this.backgroundImage, 0, 0)
        this.entities.forEach((element) => {
            element.draw()
        })
    }
    public init() {

    }
}