import Loader from "../etc/Loader";
import { Entity } from "./entities/Entity";
import { Npc } from "./entities/Npc";
import { Stuff } from "./entities/Stuff";
import { World } from "./World";
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
    private background: Array<{tileName: string, range?: number | string}>
    public entities = new Map<string, Entity>()
    constructor(background: Array<{tileName: string, range?: number | string}>, entities: Array<Entity>, linkedSpace?: {top?: Space | undefined, left?: Space | undefined, bottom?: Space | undefined, right?: Space | undefined}) {
        this.background = background
        entities.forEach((element) => {
            this.entities.set(String(this.entities.size), element)
        })
        if(linkedSpace) {
            this.linkedSpace = linkedSpace
        }
    }
    private backgroundLoad() {
        let currentXIndex = 0
        let currentYIndex = 0
        const fillAll = (element: {tileName: string, range?: number | string}) => {
            for(let i = currentXIndex; i < Math.floor(body.getBoundingClientRect().width* dpr) / 60; i++) {
                ctx.drawImage(Loader.get(`../public/assets/world/tiles/${element.tileName}.png`), 60 * i, 60 * currentYIndex)
                currentXIndex += 1
                if(currentXIndex % Math.floor(body.getBoundingClientRect().width * dpr / 60) === 0) {
                    currentXIndex = 0
                    currentYIndex += 1
                }
            }
            for(let i = currentYIndex; i < Math.floor(body.getBoundingClientRect().height* dpr) / 60; i++) {
                for(let n = currentXIndex; n < Math.floor(body.getBoundingClientRect().width * dpr) / 60; n++) {
                    ctx.drawImage(Loader.get(`../public/assets/world/tiles/${element.tileName}.png`), 60 * n, 60 * i)
                    currentXIndex += 1
                    if(currentXIndex % Math.floor(body.getBoundingClientRect().width * dpr  / 60 )=== 0) {
                        currentXIndex = 0
                        currentYIndex += 1
                        
                    }
                }
            }
        }
        this.background.forEach((element) => {
            if(element.range === undefined) {
                fillAll(element)
            } else {
                if((typeof element.range) === "number") {
                    for(let i = 0; i < Number(element.range); i++) {
                        ctx.drawImage(Loader.get(`../public/assets/world/tiles/${element.tileName}.png`), 60 * currentXIndex, 60 * currentYIndex)
                        currentXIndex += 1
                        if(currentXIndex % Math.floor(body.getBoundingClientRect().width * dpr / 60) === 0) {
                            currentXIndex = 0
                            currentYIndex += 1
                        }
                    }
                } else {
                    if(element.range === "fill-all") {
                        fillAll(element)
                    } else if(element.range === "fill-line") {
                        for(let i = currentXIndex; i < Math.floor(body.getBoundingClientRect().width* dpr) / 60; i++) {
                            ctx.drawImage(Loader.get(`../public/assets/world/tiles/${element.tileName}.png`), 60 * i, 60 * currentYIndex)
                            currentXIndex += 1
                            if(currentXIndex % Math.floor(body.getBoundingClientRect().width * dpr / 60) === 0) {
                                currentXIndex = 0
                                currentYIndex += 1
                            }
                        }
                    }
                }
            }
        })
    }
    private entitiesLoad() {
        const entitiesArr: Array<Entity> = []
        this.entities.forEach((element) => {
            entitiesArr.push(element)
            entitiesArr.sort((a, b) => {
                if (a.y > b.y) {
                    return 1;
                  }
                  if (a.y < b.y) {
                    return -1;
                  }
                  return 0;
            })
        })
        entitiesArr.forEach((element) => {
            element.load()
        })
    }
    public load() {
        this.backgroundLoad()
        this.entitiesLoad()
    }
    public addEntity(entity: Entity) {
        if(!this.entities.has(entity.name)) {
            this.entities.set(entity.name, entity)
        }
    }
    public init() {

    }
}