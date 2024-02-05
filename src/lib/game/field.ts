import { CanvasCardObject } from "../cardObject/CanvasCardObject"
import Loader from "../etc/Loader"
import { Card } from "../objects/Card"

import { bird } from "../../cardData/Bird.json"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const cardInfoOnField = document.getElementById("card-info-on-field")!
const body = document.body
const dpr = window.devicePixelRatio
const cardZonePath = "../public/assets/card-zoneX4.png"
let imageWidth: number
let imageHeight: number
type Axis = {x: number, y:number}

export class Field {
    public isOn = false
    public isArranging: boolean = false
    public isSacrificing: boolean = false
    public numOfCardZone: number
    private fieldAxis: {opponent: Array<Axis>, player: Array<Axis>} = {opponent: [], player: []}
    public fieldArrange: {opponent: Array<Card|undefined>, player: Array<Card|undefined>} = {
        opponent: [],
        player: []
    }
    public canvasCardObjects = {
        opponent: new Map<number, CanvasCardObject>(), 
        player: new Map<number, CanvasCardObject>()
    }
    private selectedCard: Card | undefined
    private selectedSacrificeCard: Array<number> = []
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
                ctx.drawImage(Loader.get(cardZonePath), dx, dy)
            }    
        }
    }
    private renderCard() {
        this.canvasCardObjects.opponent.forEach((element) => {
            element.draw()
            element.rander()
        })
        this.canvasCardObjects.player.forEach((element) => {
            element.draw()
            element.rander()
        })
    }
    
    public async selectCard(card: Card, isPlayerTurn: boolean) {
        this.selectedCard = card
        if(card.sacrifice.length < 1) {
            this.isArranging = true
        } else {
            this.isSacrificing = true
        }
        this.isPlayerTurn = isPlayerTurn
    }
    public placeCard(card: Card, fieldNum: number, isPlayerTurn: boolean) {
        if(isPlayerTurn) {
            if(!this.fieldArrange.player[fieldNum]) {
                this.fieldArrange.player[fieldNum] = card
                this.canvasCardObjects.player.set(card.cardID, new CanvasCardObject(card, isPlayerTurn, {x: this.fieldAxis.player[fieldNum].x, y: this.fieldAxis.player[fieldNum].y}))
            }
        } else {
            if(!this.fieldArrange.opponent[fieldNum]) {
                this.fieldArrange.opponent[fieldNum] = card
                this.canvasCardObjects.opponent.set(card.cardID, new CanvasCardObject(card, isPlayerTurn, {x: this.fieldAxis.opponent[fieldNum].x, y: this.fieldAxis.opponent[fieldNum].y}))
            }
        }
    }
    public kill(entity: number, fieldNum: number) {
        if(entity === 0) {
            this.canvasCardObjects.opponent.delete(this.fieldArrange.opponent[fieldNum]!.cardID)
            this.fieldArrange.opponent[fieldNum] = undefined
        } else if(entity === 1) {
            this.canvasCardObjects.player.delete(this.fieldArrange.player[fieldNum]!.cardID)
            this.fieldArrange.player[fieldNum] = undefined
        }
    }
    private loop() {
        ctx.clearRect(0, 0, body.getBoundingClientRect().width*dpr, body.getBoundingClientRect().height*dpr)
        if(!this.isOn) return
        this.draw()
        this.renderCard()
        requestAnimationFrame(this.loop)
    }
    async init() {
        imageWidth = Loader.get(cardZonePath).width
        imageHeight = Loader.get(cardZonePath).height
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
            }    
        }
        window.addEventListener("click", (e) => {
            const mouseX = e.clientX
            const mouseY = e.clientY
            if(this.isArranging) {
                if(mouseX && mouseY) {
                    for(let i = 0; i < this.numOfCardZone; i++) {
                        if(mouseX > this.fieldAxis.player[i].x/dpr && mouseX < (this.fieldAxis.player[i].x+imageWidth)/dpr) {
                            if(mouseY >= this.fieldAxis.player[i].y/dpr && mouseY < (this.fieldAxis.player[i].y+imageHeight)/dpr) {
                                if(!this.fieldArrange.player[i]) {
                                    this.placeCard(this.selectedCard!, i, this.isPlayerTurn)
                                    this.isArranging = false
                                }
                            }
                        }
                    }
                }
            }
            if(this.isSacrificing) {
                if(mouseX && mouseY) {
                    for(let i = 0; i < this.numOfCardZone; i++) {
                        if(mouseX > this.fieldAxis.player[i].x/dpr && mouseX < (this.fieldAxis.player[i].x+imageWidth)/dpr) {
                            if(mouseY >= this.fieldAxis.player[i].y/dpr && mouseY < (this.fieldAxis.player[i].y+imageHeight)/dpr) {
                                if(this.fieldArrange.player[i]) {
                                    if((this.selectedCard!.sacrifice[this.selectedSacrificeCard.length] === this.fieldArrange.player[i]!.type) || (this.selectedCard!.sacrifice[this.selectedSacrificeCard.length] === 0)) {
                                        this.selectedSacrificeCard.push(i)
                                        this.kill(1, i)
                                        if(this.selectedSacrificeCard.length === this.selectedCard!.sacrifice.length) {
                                            this.selectedSacrificeCard = []
                                            this.isSacrificing = false
                                            this.isArranging = true
                                        }
                                    }
                                }
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
        for(let i = 0; i < this.numOfCardZone; i++) {
            this.fieldArrange.player.push(undefined)
            this.fieldArrange.opponent.push(undefined)
        }
        requestAnimationFrame(this.loop)
    }
}