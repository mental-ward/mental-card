import { CanvasCardObject } from "../cardObject/CanvasCardObject"
import Loader from "../etc/Loader"
import { Card } from "../objects/Card"
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const cardInfoOnField = document.getElementById("card-info-on-field")!
const body = document.body
const dpr = window.devicePixelRatio
const cardZonePath = "../public/assets/card-zoneX4.png"
let imageWidth: number
let imageHeight: number
let canSelect = false
type Axis = {x: number, y:number}

const humenCard = new Card({
    cardID: 1,
    name: "humen",
    type: 1,
    sacrifice: 5,
    attack: 2,
    defence: 3,
    health: 4
})
export class Field {
    public isArranging: boolean = false
    public numOfCardZone: number
    private fieldAxis: {opponent: Array<Axis>, player: Array<Axis>} = {opponent: [], player: []}
    public fieldArrange: {opponent: Array<Card|undefined>, player: Array<Card|undefined>} = {
        opponent: [humenCard],
        player: []
    }
    private selectedCard: Card | undefined
    private isPlayerTurn: boolean = true
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
                const cco = new CanvasCardObject(element, {x: this.fieldAxis.opponent[index].x, y: this.fieldAxis.opponent[index].y})
                cco.draw()
            }
        })
        this.fieldArrange.player.forEach((element, index) => {
            if(element) {
                const cco = new CanvasCardObject(element, {x: this.fieldAxis.player[index].x, y: this.fieldAxis.player[index].y})
                cco.draw()
            }
        })
    }
    public async selectCard(card: Card, isPlayerTurn: boolean) {
        this.selectedCard = card
        this.isArranging = true
        this.isPlayerTurn = isPlayerTurn
        canSelect = true
    }
    public placeCard(card: Card, fieldNum: number, isPlayerTurn: boolean) {
        if(isPlayerTurn) {
            this.fieldArrange.player[fieldNum] = card
        } else {
            this.fieldArrange.opponent[fieldNum] = card
        }
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
        window.addEventListener("click", (e) => {
            if(canSelect) {
                const mouseX = e.clientX
                const mouseY = e.clientY
                if(mouseX && mouseY) {
                    for(let i = 0; i < this.numOfCardZone; i++) {
                        if(mouseX >= this.fieldAxis.player[i].x/dpr && mouseX < (this.fieldAxis.player[i].x+imageWidth)/dpr) {
                            if(mouseY >= this.fieldAxis.player[i].y/dpr && mouseY < (this.fieldAxis.player[i].y+imageHeight)/dpr) {
                                this.placeCard(this.selectedCard!, i, this.isPlayerTurn)
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
                                cardID: ${opponent.cardID}
                                name: ${opponent.name}
                                type: ${opponent.type}
                                sacrifice: ${opponent.sacrifice}
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
                                cardID: ${player.cardID}
                                name: ${player.name}
                                type: ${player.type}
                                sacrifice: ${player.sacrifice}
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