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
    public isMouseOver: boolean = false
    private theme: string
    private x3Option: string = ""
    private multiple: number = 1
    public savedPos = {
        x: 0,
        y: 0
    }
    constructor(card: Card, isPlayerCard: boolean, axis: {x: number, y: number}, theme: string, x3Option?: boolean) {
        this.card = card
        this.isPlayerCard = isPlayerCard
        this.x = axis.x
        this.y = axis.y
        // if(this.isPlayerCard) {
        //     this.y = body.getBoundingClientRect().height*60/100*dpr
        // } else {
        //     this.y = body.getBoundingClientRect().height*-dpr
        // }
        this.theme = `${theme}`
        this.x3Option = x3Option ? "x3" : ""
        this.multiple = x3Option ? 3 : 2
        this.xSaver = axis.x
        this.ySaver = axis.y
        this.save()
    }
    public load() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        const cardFramePath = `../public/assets/card/${this.theme}/front${this.x3Option}.png`
        const cardImagePath = `../public/assets/monster/${this.theme}/${this.card.id}${this.x3Option}.png`
        const typeImagePath = `../public/assets/part/type/${this.theme}/${this.card.type}${this.x3Option}.png`
        
        ctx.drawImage(Loader.get(cardFramePath), this.x, this.y)
        ctx.drawImage(Loader.get(typeImagePath), this.x + 15*2*this.multiple, this.y + 50*2*this.multiple)
        for(let i = 0; i < this.card.sacrifice.length; i++) {
            const sacrificeImage = `../public/assets/part/sacrifice/${this.card.sacrifice[i]}${this.x3Option}.png`
            ctx.drawImage(Loader.get(sacrificeImage), this.x + 4*2*this.multiple + (8*2*this.multiple*i), this.y + 34*2*this.multiple)
        }
        ctx.drawImage(Loader.get(cardImagePath), this.x, this.y)
        if(this.card.atk < 10) {
            const numberImagePath = `../public/assets/part/number/${this.card.atk}${this.x3Option}.png`
            ctx.drawImage(Loader.get(numberImagePath), this.x + 52*this.multiple, this.y + 96*this.multiple)
        } else {
            const numberImagePath1 = `../public/assets/part/number/${Math.floor(this.card.atk/10)}${this.x3Option}.png`
            const numberImagePath2 = `../public/assets/part/number/${this.card.atk%10}${this.x3Option}.png`
            ctx.drawImage(Loader.get(numberImagePath1), this.x + 48*this.multiple, this.y + 96*this.multiple)
            ctx.drawImage(Loader.get(numberImagePath2), this.x + 56*this.multiple, this.y + 96*this.multiple)
        }
        if(this.card.def < 10) {
            const numberImagePath = `../public/assets/part/number/${this.card.def}${this.x3Option}.png`
            ctx.drawImage(Loader.get(numberImagePath), this.x + 65*this.multiple, this.y + 112*this.multiple)
        } else {
            const numberImagePath1 = `../public/assets/part/number/${Math.floor(this.card.def/10)}${this.x3Option}.png`
            const numberImagePath2 = `../public/assets/part/number/${this.card.def%10}${this.x3Option}.png`
            ctx.drawImage(Loader.get(numberImagePath1), this.x + 61*this.multiple, this.y + 112*this.multiple)
            ctx.drawImage(Loader.get(numberImagePath2), this.x + 69*this.multiple, this.y + 112*this.multiple)
        }
        if(this.card.heal < 10) {
            const numberImagePath = `../public/assets/part/number/${this.card.heal}${this.x3Option}.png`
            ctx.drawImage(Loader.get(numberImagePath), this.x + 13*this.multiple, this.y + 103*this.multiple)
        } else {
            const numberImagePath1 = `../public/assets/part/number/${Math.floor(this.card.heal/10)}${this.x3Option}.png`
            const numberImagePath2 = `../public/assets/part/number/${this.card.heal%10}${this.x3Option}.png`
            ctx.drawImage(Loader.get(numberImagePath1), this.x + 9*this.multiple, this.y + 103*this.multiple)
            ctx.drawImage(Loader.get(numberImagePath2), this.x + 17*this.multiple, this.y + 103*this.multiple)
        }
        
    }
    public save() {
        this.savedPos.x = this.x
        this.savedPos.y = this.y
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