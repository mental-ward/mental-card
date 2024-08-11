import { Wait } from "../etc/Wait"

const canvas = document.getElementById("fog") as HTMLCanvasElement
const fog = canvas.getContext("2d") as CanvasRenderingContext2D
const dpr = window.devicePixelRatio
const body = document.body


export class ArcFade {
    static color: string = "black"
    static radius: number = (body.getBoundingClientRect().width/2+body.getBoundingClientRect().width/4) * dpr
    static speed: number = 0

    static loop() {
        if(ArcFade.speed !== 0 && (ArcFade.speed > 0 && !(ArcFade.radius >= (body.getBoundingClientRect().width/2+body.getBoundingClientRect().width/4) * dpr)) || (ArcFade.speed < 0 && !(ArcFade.radius <= 0))) {
            if(ArcFade.radius < 0) {
                ArcFade.radius = 0
            }
            ArcFade.radius += ArcFade.speed
            fog.clearRect(0, 0, body.getBoundingClientRect().width * dpr, body.getBoundingClientRect().height * dpr)
            fog.fillStyle = ArcFade.color
            fog.fillRect(0, 0, body.getBoundingClientRect().width * dpr, body.getBoundingClientRect().width * dpr)
            fog.restore()
            fog.save()
            fog.globalCompositeOperation = "destination-out"
            fog.beginPath()
            fog.arc(body.getBoundingClientRect().width/2 * dpr, body.getBoundingClientRect().height/2 * dpr, ArcFade.radius, 0, 2 * Math.PI)
            fog.fill()
            fog.restore()
        }
        requestAnimationFrame(ArcFade.loop)
    }

    static init() {
        requestAnimationFrame(ArcFade.loop)
    }
    static async in(speed: number, waitSec: number) {
        this.radius = 0
        canvas.style.zIndex = "10"
        this.speed = 30 * speed
        await Wait(waitSec)
        canvas.style.zIndex = "0"
    }
    static async out(speed: number, waitSec: number) {
        this.radius = (body.getBoundingClientRect().width/2+body.getBoundingClientRect().width/4) * dpr
        canvas.style.zIndex = "10"
        this.speed = -30 * speed
        await Wait(waitSec)
        canvas.style.zIndex = "0"
    }
}