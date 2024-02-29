import { Stuff } from "./entities/Stuff";
import { Player } from "./entities/Player";
import { Space } from "./Space"
import { Npc } from "./entities/Npc";
import { Subtitle } from "../subtitle/Subtitle";
import { space0, startSpace0Script } from "./spaceData/Space0";

const body = document.body
const bell = document.getElementById("bell")!
const playerContainer = document.getElementById("player-container")!
const cardInfo = document.getElementById("card-info")!
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
        if(World.targetedEventer?.eventAvailability && !World.atEvent) {
            World.atEvent = true
            World.targetedEventer.event()
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
        const canMove = {w: true, a: true, s: true, d: true}
        const detectCollision = () => {
            World.currentSpace.entities.forEach((element) => {
                if(element instanceof Stuff) {
                    
                }
                let w = true
                let a = true
                let s = true
                let d = true
                const vx = (World.player.x + World.player.w / 2) - (element.x + element.w / 2)
                const vy = (World.player.y + World.player.h / 2) - (element.y + element.h / 2)
                const colliedX = World.player.w / 2 + element.w / 2
                const colliedY = World.player.h / 2 + element.h / 2
                if(World.player.x + World.player.w <= element.x && (World.player.y + World.player.h > element.y && World.player.y < element.y + element.h))  {
                    if(Math.abs(vx) <= colliedX) {
                        if(vx < 0) {
                            d = false
                        }
                    }
                }
                if(World.player.x + World.player.w >= element.x && (World.player.y + World.player.h > element.y && World.player.y < element.y + element.h)) {
                    if(Math.abs(vx) <= colliedX) {
                        if(vx > 0) {
                            a = false
                        }
                    }
                }
                if(World.player.y + World.player.h <= element.y && (World.player.x < element.x + element.w && World.player.x + World.player.w > element.x)) {
                    if(Math.abs(vy) <= colliedY) {
                        if(vy < 0) {
                            s = false
                        }
                    }
                }
                if(World.player.y + World.player.h >= element.y && (World.player.x < element.x + element.w && World.player.x + World.player.w > element.x)) {
                    if(Math.abs(vy) <= colliedY) {
                        if(vy > 0) {
                            w = false
                        }
                    }
                }
                if(!canMove.d) d = canMove.d
                if(!canMove.a)  a = canMove.a
                if(!canMove.s) s = canMove.s
                if(!canMove.w) w = canMove.w
                canMove.w = w
                canMove.a = a
                canMove.s = s
                canMove.d = d
            })
        }
        if(keyPrees.w) {
            World.player.state = "back"
            for(let i = 0; i < speed; i++) {
                detectCollision()
                if(canMove.w) World.player.y -= 1
            }
        }
        if(keyPrees.a) {
            World.player.state = "left"
            for(let i = 0; i < speed; i++) {
                detectCollision()
                if(canMove.a) World.player.x -= 1
            }
        }
        if(keyPrees.s) {
            World.player.state = "front"
            for(let i = 0; i < speed; i++) {
                detectCollision()
                if(canMove.s) World.player.y += 1
            }
        }
        if(keyPrees.d) {
            World.player.state = "right"
            for(let i = 0; i < speed; i++) {
                detectCollision()
                if(canMove.d) World.player.x += 1
            }
        }
    }
    static render() {
        World.currentSpace.load()
        World.player.load()
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
                World.movePlayer(10)
            }
            World.render()
            if(World.player.y < 0) {
                if(World.currentSpace.linkedSpace.top) {
                    World.currentSpace.linkedSpace.top.linkedSpace.bottom = World.currentSpace
                    World.currentSpace = World.currentSpace.linkedSpace.top
                }
                World.player.y = body.getBoundingClientRect().height * dpr
            } else if(World.player.y > body.getBoundingClientRect().height * dpr) {
                if(World.currentSpace.linkedSpace.bottom) {
                    World.currentSpace.linkedSpace.bottom.linkedSpace.top = World.currentSpace
                    World.currentSpace = World.currentSpace.linkedSpace.bottom
                }
                World.player.y = 0
            }
            if(World.player.x < 0) {
                if(World.currentSpace.linkedSpace.left) {
                    World.currentSpace.linkedSpace.left.linkedSpace.right = World.currentSpace
                    World.currentSpace = World.currentSpace.linkedSpace.left
                }
                World.player.x = body.getBoundingClientRect().width * dpr
            } else if(World.player.x > body.getBoundingClientRect().width * dpr) {
                if(World.currentSpace.linkedSpace.right) {
                    World.currentSpace.linkedSpace.right.linkedSpace.left = World.currentSpace
                    World.currentSpace = World.currentSpace.linkedSpace.right
                }
                World.player.x = 0
            }
        }
        requestAnimationFrame(World.loop)
    }
    static init() {
        World.currentSpace = space0
    }
    static on() {
        window.addEventListener("keydown", keydownEvent)
        window.addEventListener("keyup", keyupEvent)
        window.addEventListener("keypress", keypressEvent)
        bell.classList.add("bell-hidden")
        playerContainer.style.transform = `translate(0px, ${body.getBoundingClientRect().height / 100 * 40}px)`
        cardInfo.style.transform = `translate(500px, 0px)`
        World.isOn = true
        requestAnimationFrame(World.loop)
        // @Lotinex
        // 다른곳이 적당하다고 생각하면 호출 위치 수정 ㄱㄱ 
        // Space0가 처음 시작하게되는 장면이라는 가정 하에 이곳에 넣은거임 
        // (게임이 시작하고 Space0 스크립트가 호출되도록)
        startSpace0Script()
    }
    static off() {
        window.removeEventListener("keydown", keydownEvent)
        window.removeEventListener("keyup", keyupEvent)
        window.removeEventListener("keypress", keypressEvent)
        bell.classList.remove("bell-hidden")
        playerContainer.style.transform = `translate(0px, 0px)`
        cardInfo.style.transform = `translate(0px, 0px)`
        World.isOn = false
    }
}