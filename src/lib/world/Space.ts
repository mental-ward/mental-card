import Loader from "../etc/Loader";
import { Npc } from "./entities/Npc";
import { Stuff } from "./entities/Stuff";
const body = document.body
const dpr = window.devicePixelRatio
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
export class Space {
    public linkedSpace: {top?: Space | undefined, left?: Space | undefined, bottom?: Space | undefined, right?: Space | undefined} = {
        top: undefined, 
        left: undefined,
        bottom: undefined,
        right: undefined
    }
    private backgroundImagePath: string
    public entities = new Map<number, Stuff | Npc>()
    constructor(backgroundImagePath: string, entities: Array<Stuff | Npc>, linkedSpace?: {top?: Space | undefined, left?: Space | undefined, bottom?: Space | undefined, right?: Space | undefined}) {
        this.backgroundImagePath = backgroundImagePath
        entities.forEach((element) => {
            this.entities.set(this.entities.size, element)
        })
        if(linkedSpace) {
            this.linkedSpace = linkedSpace
        }
    }
    public load() {
        // ctx.drawImage(Loader.get(this.backgroundImagePath), 0, 0)
        this.entities.forEach((element) => {
            element.load()
        })
    }
    public init() {

    }
}