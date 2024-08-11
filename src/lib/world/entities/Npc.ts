import Loader from "../../etc/Loader";
import { World } from "../World";
import { Entity } from "./Entity";
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const dpr = window.devicePixelRatio
export class Npc extends Entity {
    public state = "front"

    public eventAvailability: boolean = false
    public eventInfo: {type: string, listener: Function} = {
        type: "",
        listener: () => {}
    }

    private xSaver: number = 0
    private ySaver: number = 0
    private motionsInfo: {
        all: Array<{direction: string, transitionValue: number, time: number}>,
        length: number,
        index: number,
        activate: boolean
        callback?: Function | undefined
    } = {
        all: [],
        length: 0,
        index: 0,
        activate: false
    }

    private eventHandler() {
        // talk event
        if(this.eventInfo.type === "talk") {
            if(Math.abs(World.player.x - this.x) < 30 * 4 && Math.abs(World.player.y - this.y) < 30 * 4) {
                this.eventAvailability = true
                World.targetedEventer = this
                ctx.drawImage(Loader.get("../public/assets/world/entity/etc/E.png"), this.x + this.w/2 - 6 * 4 / 2, this.y - 13 * 4)
            } else {
                this.eventAvailability = false
            }
        }
    }

    private motionHandler() {
        if(this.motionsInfo.activate) {
            const currentMotion = this.motionsInfo.all[this.motionsInfo.index]
            const direction = currentMotion.direction
            const transitionValue = currentMotion.transitionValue
            const time = currentMotion.time
            const speed = Math.abs(transitionValue)/(time * 60) * dpr
            const xDestination = this.xSaver + transitionValue
            const yDestination = this.ySaver + transitionValue
            if(direction === "x") {
                if(this.x !== xDestination) {
                    if(this.x < xDestination) {
                        if(this.x + speed > xDestination) {
                            this.x = xDestination
                        } else {
                            this.x += speed
                        }
                    } else {
                        if(this.x - speed < xDestination) {
                            this.x = xDestination
                        } else {
                            this.x -= speed
                        }
                    }
                } else {
                    this.xSaver = this.x
                    if(this.motionsInfo.index + 1 !== this.motionsInfo.length) {
                        this.motionsInfo.index += 1
                    } else {
                        this.motionsInfo.activate = false
                        if(this.motionsInfo.callback) this.motionsInfo.callback()
                    }
                }
            } else if(direction === "y") {
                if(this.y !== yDestination) {
                    if(this.y < yDestination) {
                        if(this.y + speed > yDestination) {
                            this.y = yDestination
                        } else {
                            this.y += speed
                        }
                    } else {
                        if(this.y - speed < yDestination) {
                            this.y = yDestination
                        } else {
                            this.y -= speed
                        }
                    }
                } else {
                    this.ySaver = this.y
                    if(this.motionsInfo.index + 1 !== this.motionsInfo.length) {
                        this.motionsInfo.index += 1
                    } else {
                        this.motionsInfo.activate = false
                        if(this.motionsInfo.callback) this.motionsInfo.callback()
                    }
                }
            }
        }
    }

    public load() {
        ctx.drawImage(Loader.get(`../public/assets/world/entity/shadow/shadow.png`), this.x, this.y + Math.floor(this.h/1.7))
        ctx.drawImage(Loader.get(`../public/assets/world/entity/${this.name}/${this.state}.png`), this.x, this.y)
        this.motionHandler()
        this.eventHandler()
    }
    public addEventListener(eventType: string, event: Function) {
        this.eventInfo.type = eventType
        this.eventInfo.listener = event
    }
    public async motion(motions: Array<{direction: string, transitionValue: number, time: number}>, callback?: Function) {
        if(!this.motionsInfo.activate) {
            this.xSaver = this.x
            this.ySaver = this.y
            this.motionsInfo.all = motions
            this.motionsInfo.length = motions.length
            this.motionsInfo.index = 0
            this.motionsInfo.activate = true
            this.motionsInfo.callback = callback
        } else {
            console.error("motion is already activate!")
        }
    }
}