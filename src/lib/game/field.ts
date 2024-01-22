import Loader from "../etc/Loader"
import { Card } from "../objects/Card"
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const cardInfoOnField = document.getElementById("card-info-on-field")!
const body = document.body
const dpr = window.devicePixelRatio
const cardZonePath = "../public/assets/card-zoneX4.png"
const cardImagePath = "../public/assets/card/frontX4.png"
let imageWidth: number
let imageHeight: number
let canSelect = false
type Axis = {x: number, y:number}
const monster = new Card({
    uid: 1,
    name: "asd",
    attack: 1,
    defence: 1,
    health: 10
})
export class Field {
    public isArranging: boolean = false
    public numOfCardZone: number
    private fieldAxis: {opponent: Array<Axis>, player: Array<Axis>} = {opponent: [], player: []}
    public fieldArrange: {opponent: Array<Card|undefined>, player: Array<Card|undefined>} = {
        opponent: [monster, undefined, monster],
        player: []
    }
    private selectedCard: Card | undefined
    constructor(numOfCardZone: number) {
        this.numOfCardZone = numOfCardZone
        this.loop = this.loop.bind(this)
    }
    private draw() {
        const top = Math.floor(body.getBoundingClientRect().height*dpr/100*60/2 - imageHeight + 4)
        const left = Math.floor(body.getBoundingClientRect().width*dpr/2 - imageWidth * this.numOfCardZone/2 + 4 * (this.numOfCardZone-1)/2)
        for(let i = 0; i < 2; i++) {
            for(let n = 0; n < this.numOfCardZone; n++) {
                const dx = left + ((imageWidth - 4) * n)
                const dy = top + ((imageHeight - 4) * i)
                if(i === 0) {
                    this.fieldAxis.opponent.push({x: dx, y: dy})
                } else {
                    this.fieldAxis.player.push({x: dx, y: dy})
                }
                ctx.drawImage(Loader.get(cardZonePath), dx, dy)
            }    
        }
    }
    private renderCard() {
        this.fieldArrange.opponent.forEach((element, index) => {
            if(element) {
                ctx.drawImage(Loader.get(cardImagePath), this.fieldAxis.opponent[index].x, this.fieldAxis.opponent[index].y)
            }
        })
        this.fieldArrange.player.forEach((element, index) => {
            if(element) {
                ctx.drawImage(Loader.get(cardImagePath), this.fieldAxis.player[index].x, this.fieldAxis.player[index].y)
            }
        })
    }
    public async selectCard(card: Card) {
        this.selectedCard = card
        this.isArranging = true
        canSelect = true
    }
    public newArrange(card: Card, fieldNum: number) {
        this.fieldArrange.player[fieldNum] = card
        // ctx.drawImage(Loader.get(cardImagePath), this.fieldAxis.player[0].x, this.fieldAxis.player[0].y)
    }
    public kill(entity: number, fieldNum: number) {
        if(entity === 0) {
            this.fieldArrange.opponent[fieldNum] = undefined
        } else if(entity === 1) {
            this.fieldArrange.player[fieldNum] = undefined
        }
    }
    private loop() {
        ctx.clearRect(0, 0, body.getBoundingClientRect().width*dpr, body.getBoundingClientRect().height*dpr)
        this.draw()
        this.renderCard()
        requestAnimationFrame(this.loop)
    }
    init() {
        window.addEventListener("mouseup", (e) => {
            if(canSelect) {
                const mouseX = e.clientX
                const mouseY = e.clientY
                if(mouseX && mouseY) {
                    for(let i = 0; i < this.numOfCardZone; i++) {
                        if(mouseX >= this.fieldAxis.player[i].x/dpr && mouseX < (this.fieldAxis.player[i].x+imageWidth)/dpr) {
                            if(mouseY >= this.fieldAxis.player[i].y/dpr && mouseY < (this.fieldAxis.player[i].y+imageHeight)/dpr) {
                                this.newArrange(this.selectedCard!, i)
                                canSelect = false
                                this.isArranging = false
                            }
                        }
                    }
                }
            }
            
        })
        window.addEventListener("mousemove", (e) => {
            const mouseX = e.clientX
            const mouseY = e.clientY
            cardInfoOnField.innerText = ""
            for(let i = 0; i < this.numOfCardZone; i++) {
                if(mouseX >= this.fieldAxis.opponent[i].x/dpr && mouseX < (this.fieldAxis.opponent[i].x+imageWidth)/dpr) {
                    if(mouseY >= this.fieldAxis.opponent[i].y/dpr && mouseY < (this.fieldAxis.opponent[i].y+imageHeight)/dpr) {
                        if(this.fieldArrange.opponent[i]) {
                            const opponent = this.fieldArrange.opponent[i]!
                            cardInfoOnField.innerText = `
                                name: ${opponent.name}
                                health: ${opponent.heal}
                                attack: ${opponent.atk}
                                defence: ${opponent.def}
                            `
                        }
                    }
                }
                if(mouseX >= this.fieldAxis.player[i].x/dpr && mouseX < (this.fieldAxis.player[i].x+imageWidth)/dpr) {
                    if(mouseY >= this.fieldAxis.player[i].y/dpr && mouseY < (this.fieldAxis.player[i].y+imageHeight)/dpr) {
                        if(this.fieldArrange.player[i]) {
                            const player = this.fieldArrange.player[i]!
                            cardInfoOnField.innerText = `
                                name: ${player.name}
                                health: ${player.heal}
                                attack: ${player.atk}
                                defence: ${player.def}
                            `
                        }
                    }
                }
            }
        })
        imageWidth = Loader.get(cardZonePath).width
        imageHeight = Loader.get(cardZonePath).height
        for(let i = 0; i < this.numOfCardZone; i++) {
            this.fieldArrange.player.push(undefined)
            this.fieldArrange.opponent.push(undefined)
        }
        requestAnimationFrame(this.loop)
    }
}