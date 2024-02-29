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
    private isPlayerTurn: boolean = false
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
        const cardFramePath = "../public/assets/card/front.png"
        const cardImagePath = `../public/assets/monster/${this.card.name}.png`
        const typeImagePath = `../public/assets/part/type/${this.card.type}.png`
        
        ctx.drawImage(Loader.get(cardFramePath), this.x, this.y)
        ctx.drawImage(Loader.get(typeImagePath), this.x + 17*4, this.y + 42*4)
        for(let i = 0; i < this.card.sacrifice.length; i++) {
            const sacrificeImage = `../public/assets/part/sacrifice/${this.card.sacrifice[i]}.png`
            ctx.drawImage(Loader.get(sacrificeImage), this.x + 4*4 + (8*4*i), this.y + 33*4)
        }
        ctx.drawImage(Loader.get(cardImagePath), this.x, this.y)
        if(this.card.atk < 10) {
            const numberImagePath = `../public/assets/part/number/${this.card.atk}.png`
            ctx.drawImage(Loader.get(numberImagePath), this.x + 52*2, this.y + 96*2)
        } else {
            const numberImagePath1 = `../public/assets/part/number/${Math.floor(this.card.atk/10)}.png`
            const numberImagePath2 = `../public/assets/part/number/${this.card.atk%10}.png`
            ctx.drawImage(Loader.get(numberImagePath1), this.x + 48*2, this.y + 96*2)
            ctx.drawImage(Loader.get(numberImagePath2), this.x + 56*2, this.y + 96*2)
        }
        if(this.card.def < 10) {
            const numberImagePath = `../public/assets/part/number/${this.card.def}.png`
            ctx.drawImage(Loader.get(numberImagePath), this.x + 65*2, this.y + 112*2)
        } else {
            const numberImagePath1 = `../public/assets/part/number/${Math.floor(this.card.def/10)}.png`
            const numberImagePath2 = `../public/assets/part/number/${this.card.def%10}.png`
            ctx.drawImage(Loader.get(numberImagePath1), this.x + 61*2, this.y + 112*2)
            ctx.drawImage(Loader.get(numberImagePath2), this.x + 69*2, this.y + 112*2)
        }
        if(this.card.heal < 10) {
            const numberImagePath = `../public/assets/part/number/${this.card.heal}.png`
            ctx.drawImage(Loader.get(numberImagePath), this.x + 13*2, this.y + 103*2)
        } else {
            const numberImagePath1 = `../public/assets/part/number/${Math.floor(this.card.heal/10)}.png`
            const numberImagePath2 = `../public/assets/part/number/${this.card.heal%10}.png`
            ctx.drawImage(Loader.get(numberImagePath1), this.x + 9*2, this.y + 103*2)
            ctx.drawImage(Loader.get(numberImagePath2), this.x + 17*2, this.y + 103*2)
        }
        if(this.card.abilities.length !== 0) {
            ctx.drawImage(Loader.get( `../public/assets/part/abilities/${this.card.abilities}.png`), this.x + 29*2, this.y + 104*2)
        }
        
    }
    public attack(isPlayerTurn: boolean) {
        this.isAttacking = true
        this.isPlayerTurn = isPlayerTurn
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
            if(this.isPlayerTurn) { // 내 턴일때 내 공격
                if(!this.attackMotion) {
                    this.moveTo(this.x, this.ySaver - 25, 10)
                    if(this.y === this.ySaver - 25) { // 일정 높이까지 가면
                        this.attackMotion = true // 다시 원상태로 가야겠지?
                    }
                } else {
                    this.moveTo(this.x, this.ySaver, 10)
                    if(this.y === this.ySaver) { // 원래 위치로 가면
                        this.attackMotion = false
                        this.isAttacking = false
                    }
                }
            } else { // 상대 턴일때 상대 공격
                if(!this.attackMotion) {
                    this.moveTo(this.x, this.ySaver + 25, 10)
                    if(this.y === this.ySaver + 25) {
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
}