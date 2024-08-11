import Loader from "../etc/Loader"
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

export class CanvasObject {
    public x: number = 0
    public y: number = 0
    public savedPos = {
        x: 0,
        y: 0
    }
    private imagePath: string
    public isAttacking: boolean = false
    constructor(imagePath: string, axis: {x: number, y: number}) {
        this.imagePath = imagePath
        this.x = axis.x
        this.y = axis.y
        this.save()
    }
    public load() {
        ctx.drawImage(Loader.get(this.imagePath), this.x, this.y)
    }
    public save() {
        this.savedPos.x = this.x
        this.savedPos.y = this.y
    }
    async moveTo(x: number, y: number, speed: number) {
        if(this.x !== x) {
            if(this.x < x) {
                if(this.x + speed > x) {
                    this.x += x - this.x
                } else {
                    this.x += speed
                }
            } else {
                if(this.x - speed < x) {
                    this.x -= this.x - x
                } else {
                    this.x -= speed
                }
            }
        }
        if(this.y !== y) {
            if(this.y < y) {
                if(this.y + speed > y) {
                    this.y += y - this.y
                } else {
                    this.y += speed
                }
            } else {
                if(this.y - speed < y) {
                    this.y -= this.y - y
                } else {
                    this.y -= speed
                }
            }
        }
    }
}