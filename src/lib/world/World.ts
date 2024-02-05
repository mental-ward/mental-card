import { Entity } from "./entities/Entity";
import { Player } from "./entities/Player";
import { Space } from "./Space"

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

export class World {
    static isOn = false
    static player = new Player("tester", {x: 0, y: 0})
    // static space1 = new Space()
    constructor() {
        World.loop = World.loop.bind(World)
    }
    private static movePlayer(speed: number) {
        if(keyPrees.w) {
            World.player.state = "back"
            World.player.y -= speed
        }
        if(keyPrees.a) {
            World.player.state = "left"
            World.player.x -= speed
        }
        if(keyPrees.s) {
            World.player.state = "front"
            World.player.y += speed
        }
        if(keyPrees.d) {
            World.player.state = "right"
            World.player.x += speed
        }
    }
    static render() {
        World.player.draw()
    }
    static loop() {
        ctx.clearRect(0, 0, window.innerWidth*dpr, window.innerHeight*dpr)
        if(!World.isOn) {
            return
        }
        World.movePlayer(10)
        World.render()
        requestAnimationFrame(World.loop)
    }
    static init() {
        window.addEventListener("keydown", (e) => {
            if(e.key === "w" || e.key === "W") {
                keyPrees.w = true
            } else if(e.key === "a"  || e.key === "A") {
                keyPrees.a = true
            } else if(e.key === "s"  || e.key === "S") {
                keyPrees.s = true
            } else if(e.key === "d"  || e.key === "D") {
                keyPrees.d = true
            }
        })
        window.addEventListener("keyup", (e) => {
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
        })
    }
    static on() {
        bell.style.transform = `translate(0px, ${body.getBoundingClientRect().height / 100 * 40 + 110}px)`
        playerContainer.style.transform = `translate(0px, ${body.getBoundingClientRect().height / 100 * 40}px)`
        cardInfo.style.transform = `translate(500px, 0px)`
        World.isOn = true
        requestAnimationFrame(World.loop)
    }
    static off() {
        bell.style.transform = `translate(0px, 0px)`
        playerContainer.style.transform = `translate(0px, 0px)`
        cardInfo.style.transform = `translate(0px, 0px)`
        World.isOn = false
    }
}