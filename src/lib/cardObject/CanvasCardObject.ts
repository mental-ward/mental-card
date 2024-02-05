import { Card } from "../objects/Card";
import Loader  from "../etc/Loader"
const body = document.body
const dpr = window.devicePixelRatio
export class CanvasCardObject {
    public x: number = 0
    public y: number = 0
    private xSaver: number = 0
    private ySaver: number = 0
    private isArranged: boolean = false
    public card: Card
    public isAttacking: boolean = false
    private isPlayerCard: boolean
    private attackMotion: boolean = false
    constructor(card: Card, isPlayerCard: boolean, axis: {x: number, y: number}) {
        this.card = card
        this.isPlayerCard = isPlayerCard
        this.x = axis.x
        if(this.isPlayerCard) {
            this.y = body.getBoundingClientRect().height*60/100*dpr
        } else {
            this.y = body.getBoundingClientRect().height*-dpr
        }
        this.xSaver = axis.x
        this.ySaver = axis.y
    }
    public draw() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        const cardFramePath = "../public/assets/card/frontX4.png"
        const cardImagePath = `../public/assets/monster/${this.card.name}X4.png`
        const typeImagePath = `../public/assets/part/type/${this.card.type}X4.png`
        const abilitiesImagePath = `../public/assets/part/abilities/thornX4.png`
        
        ctx.drawImage(Loader.get(cardFramePath), this.x, this.y)
        ctx.drawImage(Loader.get(typeImagePath), this.x + 17*4, this.y + 42*4)
        for(let i = 0; i < this.card.sacrifice.length; i++) {
            const sacrificeImage = `../public/assets/part/sacrifice/${this.card.sacrifice[i]}X4.png`
            ctx.drawImage(Loader.get(sacrificeImage), this.x + 4*4 + (8*4*i), this.y + 33*4)
        }
        ctx.drawImage(Loader.get(cardImagePath), this.x, this.y)
        if(this.card.atk < 10) {
            const numberImagePath = `../public/assets/part/number/${this.card.atk}X4.png`
            ctx.drawImage(Loader.get(numberImagePath), this.x + 7*4, this.y + 52*4)
        } else {
            const numberImagePath1 = `../public/assets/part/number/${Math.floor(this.card.atk/10)}X4.png`
            const numberImagePath2 = `../public/assets/part/number/${this.card.atk%10}X4.png`
            ctx.drawImage(Loader.get(numberImagePath1), this.x + 5*4, this.y + 52*4)
            ctx.drawImage(Loader.get(numberImagePath2), this.x + 9*4, this.y + 52*4)
        }
        if(this.card.def < 10) {
            const numberImagePath = `../public/assets/part/number/${this.card.def}X4.png`
            ctx.drawImage(Loader.get(numberImagePath), this.x + 29*4, this.y + 52*4)
        } else {
            const numberImagePath1 = `../public/assets/part/number/${Math.floor(this.card.def/10)}X4.png`
            const numberImagePath2 = `../public/assets/part/number/${this.card.def%10}X4.png`
            ctx.drawImage(Loader.get(numberImagePath1), this.x + 27*4, this.y + 52*4)
            ctx.drawImage(Loader.get(numberImagePath2), this.x + 31*4, this.y + 52*4)
        }
        if(this.card.heal < 10) {
            const numberImagePath = `../public/assets/part/number/${this.card.heal}X4.png`
            ctx.drawImage(Loader.get(numberImagePath), this.x + 18*4, this.y + 53*4)
        } else {
            const numberImagePath1 = `../public/assets/part/number/${Math.floor(this.card.heal/10)}X4.png`
            const numberImagePath2 = `../public/assets/part/number/${this.card.heal%10}X4.png`
            ctx.drawImage(Loader.get(numberImagePath1), this.x + 16*4, this.y + 53*4)
            ctx.drawImage(Loader.get(numberImagePath2), this.x + 20*4, this.y + 53*4)
        }
        ctx.drawImage(Loader.get(abilitiesImagePath), this.x + 23*4, this.y + 3*4)
    }
    public attack() {
        this.isAttacking = true
    }
    public async moveTo(x: number, y: number, speed: number) {
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
    public rander() {
        if(this.y === this.ySaver) {
            this.isArranged = true
        }
        if(!this.isArranged) {
            this.moveTo(this.x, this.ySaver, 80)
        }

        if(this.isAttacking) {
            if(!this.attackMotion) {
                this.moveTo(this.x, this.ySaver - 25, 10)
                if(this.y === this.ySaver - 25) {
                    this.attackMotion = true
                }
            } else {
                this.moveTo(this.x, this.ySaver, 10)
                if(this.y === this.ySaver) {
                    this.attackMotion = false
                    this.isAttacking = false
                }
            }
        }
    }
}