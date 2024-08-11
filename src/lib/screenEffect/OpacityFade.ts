import { Wait } from "../etc/Wait"

const canvas = document.getElementById("fog") as HTMLCanvasElement
const fog = canvas.getContext("2d") as CanvasRenderingContext2D
const dpr = window.devicePixelRatio
const body = document.body

export class OpacityFade {
    static opacity: number = 0
    static speed: number = 0

    static loop() {
        if(OpacityFade.speed !== 0 && ((OpacityFade.speed > 0) && !(OpacityFade.opacity >= 1)) || ((OpacityFade.speed < 0) && !(OpacityFade.opacity <= 0))) {
            fog.clearRect(0, 0, body.getBoundingClientRect().width * dpr, body.getBoundingClientRect().height * dpr)
            fog.fillStyle = `rgba(0, 0, 0, ${OpacityFade.opacity})`
            fog.fillRect(0, 0, body.getBoundingClientRect().width * dpr, body.getBoundingClientRect().width * dpr)
            if(OpacityFade.opacity < 0) OpacityFade.opacity = 0
            if(OpacityFade.opacity > 1) OpacityFade.opacity = 1
            OpacityFade.opacity += OpacityFade.speed
            console.log("opa")
        }
        requestAnimationFrame(OpacityFade.loop)
    }
    static init() {
        requestAnimationFrame(OpacityFade.loop)
    }
    static async in(speed: number, waitSec: number) {
        this.opacity = 1
        canvas.style.zIndex = "10"
        this.speed = -0.02 * speed
        await Wait(waitSec)
        canvas.style.zIndex = "0"
    }
    static async out(speed: number, waitSec: number) {
        this.opacity = 0
        canvas.style.zIndex = "10"
        this.speed = 0.02 * speed
        await Wait(waitSec)
        canvas.style.zIndex = "0"
    }
}