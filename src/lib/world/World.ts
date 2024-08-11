import { Stuff } from "./entities/Stuff";
import { Player } from "./entities/Player";
import { Space } from "./Space"
import { Npc } from "./entities/Npc";
import { Subtitle } from "../subtitle/Subtitle";
import { Chapter } from "./Chapter";
import { Chapter0 } from "./chapters/chapter_0/main";
import { Wall } from "./entities/Wall";
import { ArcFade } from "../screenEffect/ArcFade";
import { CardGameEngine } from "../card-game/cardGameEngine";
import { OpacityFade } from "../screenEffect/OpacityFade";

const chapters = [new Chapter0()]

const body = document.body

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const dpr = window.devicePixelRatio
const keyPrees = {
    w: false,
    a: false,
    s: false,
    d: false
}
const keydownEvent = (e: KeyboardEvent) => {
    if(e.key === "w" || e.key === "W") {
        keyPrees.w = true
    } else if(e.key === "a"  || e.key === "A") {
        keyPrees.a = true
    } else if(e.key === "s"  || e.key === "S") {
        keyPrees.s = true
    } else if(e.key === "d"  || e.key === "D") {
        keyPrees.d = true
    }
}
const keyupEvent = (e: KeyboardEvent) => {
    if(e.key === "w" || e.key === "W") {
        keyPrees.w = false
    }
    if(e.key === "a"  || e.key === "A") {
        keyPrees.a = false
    }
    if(e.key === "s"  || e.key === "S") {
        keyPrees.s = false
    }
    if(e.key === "d"  || e.key === "D") {
        keyPrees.d = false
    }
}
const keypressEvent = (e: KeyboardEvent) => {
    if(e.key === "e" || e.key === "E") {
        // @Lotinex
        // undefined 버그 수정
        console.log(World.targetedEventer.x)
        if(World.targetedEventer?.eventAvailability && !World.atEvent) {
            World.atEvent = true
            World.targetedEventer.eventInfo.listener()
        }
        if(Subtitle.isOn) {
            Subtitle.next()
        }
    }
}
let then: number = window.performance.now()
export class World {
    static isPause: boolean = false
    static atEvent: boolean = false
    static isOn = false
    static targetedEventer: Npc
    static player = new Player("tester", {x: 850, y: Math.floor(body.getBoundingClientRect().height / 2 * dpr - 30 * 4 / 2), w: 15 * 4, h: 30 * 4})
    static playerMoveSpeed = 9
    static currentChapter: Chapter
    static currentSpace: Space
    
    constructor() {
        World.loop = World.loop.bind(World)
    }
    public static start() {
        World.isPause = false
    }
    public static pause() {
        World.isPause = true
    }
    private static movePlayer(speed: number) {
        const isDetectWithEntity = {w: true, a: true, s: true, d: true}
        const entityDetectSensor = () => {
            World.currentSpace.entities.forEach((element) => {
                let w = true
                let a = true
                let s = true
                let d = true
                
                const m = 2
                const vx = (World.player.x + World.player.w / 2) - (element.x + element.w / 2)
                const vy = (World.player.y + World.player.h/m + World.player.h/m / 2) - (element.y + element.h/m + element.h/m / 2)
                const colliedX = World.player.w / 2 + element.w / 2
                const colliedY = World.player.h/m / 2 + element.h/m / 2
                const isInYCollisionRange = (World.player.y + World.player.h/m + World.player.h/m > element.y + element.h/m && World.player.y + World.player.h/m < element.y + element.h/m + element.h/m)
                const isInXCollisionRange = (World.player.x < element.x + element.w && World.player.x + World.player.w > element.x)
                if(World.player.x + World.player.w <= element.x && isInYCollisionRange)  {
                    if((Math.abs(vx) <= colliedX) && (vx < 0)) d = false
                }
                if(World.player.x + World.player.w >= element.x && isInYCollisionRange) {
                    if((Math.abs(vx) <= colliedX) && (vx > 0)) a = false
                }
                if(World.player.y + World.player.h/m + World.player.h/m <= element.y + element.h/m && isInXCollisionRange) {
                    if((Math.abs(vy) <= colliedY) && (vy < 0)) s = false 
                }
                if(World.player.y + World.player.h/m + World.player.h/m >= element.y + element.h/m && isInXCollisionRange) {
                    if((Math.abs(vy) <= colliedY) &&(vy > 0)) w = false
                }
                if(!isDetectWithEntity.d) d = isDetectWithEntity.d
                if(!isDetectWithEntity.a)  a = isDetectWithEntity.a
                if(!isDetectWithEntity.s) s = isDetectWithEntity.s
                if(!isDetectWithEntity.w) w = isDetectWithEntity.w
                if(element instanceof Stuff || element instanceof Wall || element instanceof Npc) {
                    isDetectWithEntity.w = w
                    isDetectWithEntity.a = a
                    isDetectWithEntity.s = s
                    isDetectWithEntity.d = d
                }
            })
        }
        const isDetectWithWorldBorder = {w: true, a: true, s: true, d: true}
        const WorldBorderDetectSensor = () => {
            let w = true
            let a = true
            let s = true
            let d = true
            if(World.currentSpace.linkedSpace.top === undefined) {
                if(World.player.y <= 0) {
                    w = false
                }
            }
            if(World.currentSpace.linkedSpace.bottom === undefined) {
                if(World.player.y + World.player.h >= body.getBoundingClientRect().height * dpr) {
                    s = false
                }
            }
            if(World.currentSpace.linkedSpace.left === undefined) {
                if(World.player.x <= 0) {
                    a = false
                }
            }
            if(World.currentSpace.linkedSpace.right === undefined) {
                if(World.player.x + World.player.w >= body.getBoundingClientRect().width * dpr) {
                    d = false
                }
            }
            if(!isDetectWithWorldBorder.d) d = isDetectWithWorldBorder.d
            if(!isDetectWithWorldBorder.a)  a = isDetectWithWorldBorder.a
            if(!isDetectWithWorldBorder.s) s = isDetectWithWorldBorder.s
            if(!isDetectWithWorldBorder.w) w = isDetectWithWorldBorder.w
            isDetectWithWorldBorder.w = w
            isDetectWithWorldBorder.a = a
            isDetectWithWorldBorder.s = s
            isDetectWithWorldBorder.d = d
        }
        if(keyPrees.w) {
            World.player.state = "back"
            for(let i = 0; i < speed; i++) {
                entityDetectSensor()
                WorldBorderDetectSensor()
                if(isDetectWithEntity.w && isDetectWithWorldBorder.w) World.player.y -= 1
            }
        }
        if(keyPrees.a) {
            World.player.state = "left"
            for(let i = 0; i < speed; i++) {
                entityDetectSensor()
                WorldBorderDetectSensor()
                if(isDetectWithEntity.a && isDetectWithWorldBorder.a) World.player.x -= 1
            }
        }
        if(keyPrees.s) {
            World.player.state = "front"
            for(let i = 0; i < speed; i++) {
                entityDetectSensor()
                WorldBorderDetectSensor()
                if(isDetectWithEntity.s && isDetectWithWorldBorder.s) World.player.y += 1
            }
        }
        if(keyPrees.d) {
            World.player.state = "right"
            for(let i = 0; i < speed; i++) {
                entityDetectSensor()
                WorldBorderDetectSensor()
                if(isDetectWithEntity.d && isDetectWithWorldBorder.d) World.player.x += 1
            }
        }
    }
    static render() {
        World.currentSpace.load()
        // World.player.load()
        Subtitle.load()
    }
    static loop(timestamp: number) {
        const fps = 1000/60     // 60fps
        const elapsed = timestamp - then
        if(elapsed >= fps) {  // 60프레임으로 제한
            then = timestamp - (elapsed % fps)
            ctx.clearRect(0, 0, window.innerWidth*dpr, window.innerHeight*dpr)
            if(!World.isOn) {
                return
            }
            if(!World.isPause) {
                World.movePlayer(World.playerMoveSpeed)
            }
            World.render()
            if(World.player.y < 0) {
                if(World.currentSpace.linkedSpace.top) {
                    World.currentSpace.linkedSpace.top.linkedSpace.bottom = World.currentSpace
                    World.currentSpace = World.currentSpace.linkedSpace.top
                    World.player.y = body.getBoundingClientRect().height * dpr
                }
            } else if(World.player.y > body.getBoundingClientRect().height * dpr) {
                if(World.currentSpace.linkedSpace.bottom) {
                    World.currentSpace.linkedSpace.bottom.linkedSpace.top = World.currentSpace
                    World.currentSpace = World.currentSpace.linkedSpace.bottom
                    World.player.y = 0
                }
            }
            if(World.player.x < 0) {
                if(World.currentSpace.linkedSpace.left) {
                    World.currentSpace.linkedSpace.left.linkedSpace.right = World.currentSpace
                    World.currentSpace = World.currentSpace.linkedSpace.left
                    World.player.x = body.getBoundingClientRect().width * dpr
                }
                
            } else if(World.player.x > body.getBoundingClientRect().width * dpr) {
                if(World.currentSpace.linkedSpace.right) {
                    World.currentSpace.linkedSpace.right.linkedSpace.left = World.currentSpace
                    World.currentSpace = World.currentSpace.linkedSpace.right
                    World.player.x = 0
                }
            }
            World.currentSpace.addEntity(World.player)
        }
        requestAnimationFrame(World.loop)
    }
    static init() {
        World.currentChapter = chapters[0]
        World.currentChapter.init()
        World.currentSpace = World.currentChapter.space
    }
    static async on() {
        if(!World.isOn) {
            window.addEventListener("keydown", keydownEvent)
            window.addEventListener("keyup", keyupEvent)
            window.addEventListener("keypress", keypressEvent)
            await CardGameEngine.end()
            World.isOn = true
            requestAnimationFrame(World.loop)
            // await OpacityFade.in(0.2, 1)
        }
    }
    static async off() {
        if(World.isOn) {
            await ArcFade.out(1, 1)

            window.removeEventListener("keydown", keydownEvent)
            window.removeEventListener("keyup", keyupEvent)
            window.removeEventListener("keypress", keypressEvent)
            World.isOn = false
        }
    }
}