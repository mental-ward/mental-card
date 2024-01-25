import { Card } from "../objects/Card";
import Loader  from "../etc/Loader"

export class CanvasCardObject {
    public x: number = 0
    public y: number = 0
    public card: Card
    constructor(card: Card, axis: {x: number, y: number}) {
        this.card = card
        this.x = axis.x
        this.y = axis.y
    }
    public draw() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        const cardFramePath = "../public/assets/card/frontX4.png"
        const cardImagePath = `../public/assets/monster/${this.card.name}X4.png`
        const typeImagePath = `../public/assets/part/type/${this.card.type}X4.png`
        const sacrificeImage = `../public/assets/part/sacrificeX4.png`
        ctx.drawImage(Loader.get(cardImagePath), this.x, this.y)
        ctx.drawImage(Loader.get(cardFramePath), this.x, this.y)
        ctx.drawImage(Loader.get(typeImagePath), this.x + 17*4, this.y + 28*4)
        for(let i = 0; i < this.card.sacrifice; i++) {
            ctx.drawImage(Loader.get(sacrificeImage), this.x + 2*4 + (6*4*i), this.y + 34*4)
        }
    }
}