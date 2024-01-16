import Loader from "../etc/Loader"

export class Field {
    numOfCardZone: number
    constructor(numOfCardZone: number) {
        this.numOfCardZone = numOfCardZone
    }
    draw() {
        const cardZonePath = "../public/assets/card-zoneX4.png"
        const body = document.body
        const dpr = window.devicePixelRatio
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        const imageWidth = Loader.get(cardZonePath).width
        const imageHeight = Loader.get(cardZonePath).height
        const top = body.getBoundingClientRect().height*dpr/100*60/2 - imageHeight + 3
        const left = body.getBoundingClientRect().width*dpr/2 - imageWidth * this.numOfCardZone/2 + 3 * (this.numOfCardZone-1)/2
        for(let i = 0; i < 2; i++) {
            for(let n = 0; n < this.numOfCardZone; n++) {
                ctx.drawImage(Loader.get(cardZonePath), left + ((imageWidth - 3) * n), top + ((imageHeight - 3) * i))
            }    
        }
        
    }
}