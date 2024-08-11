import { CanvasCardObject } from "../cardObject/CanvasCardObject"
import Loader from "../etc/Loader"
import { Card } from "../objects/Card"
import { CardGameUI } from "./CardGameUI"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const body = document.body
const dpr = window.devicePixelRatio
const cardZonePath = "../public/assets/card-zone.png"
let imageWidth: number
let imageHeight: number
const UISize = {w: 1500, h: 375}
type Axis = {x: number, y:number}

export class Field {
    public isOn = false
    public isArranging: boolean = false
    public isSacrificing: boolean = false
    public numOfCardZone: number
    public fieldAxis: {opponent: Array<Axis>, player: Array<Axis>} = {opponent: [], player: []}
    private save: {opponent: Array<Axis>, player: Array<Axis>} = {opponent: [], player: []}
    public fieldArrange: {opponent: Array<Card|undefined>, player: Array<Card|undefined>} = {
        opponent: [],
        player: []
    }
    public canvasCardObjects = {
        opponent: new Map<number, CanvasCardObject>(), 
        player: new Map<number, CanvasCardObject>()
    }
    public selectedCard: Card | undefined
    private selectedSacrificeCard: Array<number> = []
    private isPlayerTurn: boolean = true
    private opacity: {value: number, state: boolean} = {
        value: 0,
        state: false
    }
    public isLookField = false
    public isUpdating = false
    constructor(numOfCardZone: number) {
        this.numOfCardZone = numOfCardZone
    }
    private renderCard() {
        this.canvasCardObjects.opponent.forEach((element) => {
            element.load()
            element.rander()
        })
        this.canvasCardObjects.player.forEach((element) => {
            element.load()
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
                this.canvasCardObjects.player.set(card.uid, new CanvasCardObject(card, isPlayerTurn, {x: this.fieldAxis.player[fieldNum].x, y: this.fieldAxis.player[fieldNum].y}, card.theme, true))
                // this.isLookField = false
                // CardGameUI.lookMode.isOn = true
            }
        } else {
            if(!this.fieldArrange.opponent[fieldNum]) {
                this.fieldArrange.opponent[fieldNum] = card
                this.canvasCardObjects.opponent.set(card.uid, new CanvasCardObject(card, isPlayerTurn, {x: this.fieldAxis.opponent[fieldNum].x, y: this.fieldAxis.opponent[fieldNum].y}, card.theme, true))
                // this.isLookField = false
                // CardGameUI.lookMode.isOn = true
            }
        }
    }
    public numOfCardOnField() {
        let playerCardCount: Array<number> = []
        let opponentCardCount: Array<number> = []
        this.fieldArrange.player.map((element) => {
            if(element) {
                playerCardCount.push(element.type)
            }
        })
        this.fieldArrange.opponent.map((element) => {
            if(element) {
                opponentCardCount.push(element.type)
            }
        })
        return {
            player: {
                types: {
                    1: playerCardCount.filter((element) => element === 1).length,
                    2: playerCardCount.filter((element) => element === 2).length,
                    3: playerCardCount.filter((element) => element === 3).length
                },
                total: playerCardCount.length
            }, 
            opponent: {
                types: {
                    1: opponentCardCount.filter((element) => element === 1).length,
                    2: opponentCardCount.filter((element) => element === 2).length,
                    3: opponentCardCount.filter((element) => element === 3).length
                },
                total: opponentCardCount.length
            }
        }
    }
    public kill(entity: number, fieldNum: number) {
        if(entity === 0) {
            this.canvasCardObjects.opponent.delete(this.fieldArrange.opponent[fieldNum]!.uid)
            this.fieldArrange.opponent[fieldNum] = undefined
        } else if(entity === 1) {
            this.canvasCardObjects.player.delete(this.fieldArrange.player[fieldNum]!.uid)
            this.fieldArrange.player[fieldNum] = undefined
        }
    }
    public load() {
        if(!this.isOn) return
        this.showPlaceAnimate()
        
        this.updateField()
        this.renderCard()
    }
    private showPlaceAnimate() {
        if(this.isArranging) {
            for(let n = 0; n < this.numOfCardZone; n++) {
                ctx.save()
                ctx.globalAlpha = this.opacity.value
                const dx = this.fieldAxis.player[n].x
                const dy = this.fieldAxis.player[n].y
                ctx.drawImage(Loader.get(cardZonePath), dx, dy)
                ctx.restore()    
            }
            if(this.opacity.state) {
                this.opacity.value -= 0.03
            } else {
                this.opacity.value += 0.03
            }
            if(this.opacity.value > 1) {
                this.opacity.value = 1
                this.opacity.state = true
            } else if(this.opacity.value < 0) {
                this.opacity.value = 0
                this.opacity.state = false
            }
        } else {
            this.opacity.state = false
            this.opacity.value = 0
        }
    }
    private updateField() {
        const moveSpeed = 15
        let i = 0
        this.canvasCardObjects.opponent.forEach((card) => {
            if(this.isLookField) {
                card.moveTo(card.savedPos.x, this.save.opponent[i].y + UISize.h, moveSpeed)
            } else {
                card.moveTo(card.savedPos.x, this.save.opponent[i].y, moveSpeed)
            }
            i += 1
        })
        i = 0
        this.canvasCardObjects.player.forEach((card) => {
            if(this.isLookField) {
                card.moveTo(card.savedPos.x, this.save.player[i].y + UISize.h, moveSpeed)
            } else {
                card.moveTo(card.savedPos.x, this.save.player[i].y, moveSpeed)
            }
            i += 1
        })
        this.fieldAxis.opponent.forEach((element, index) => {
            if(this.isLookField) {
                if(element.y >= this.save.opponent[index].y + UISize.h) {
                    this.isUpdating = false
                } else {
                    this.isUpdating = true
                }
                if(this.isUpdating) {
                    element.y += moveSpeed
                    
                }
            } else {
                if(element.y <= this.save.opponent[index].y) {
                    this.isUpdating = false
                } else {
                    this.isUpdating = true
                }
                if(this.isUpdating) {
                    element.y -= moveSpeed
                }
            }
        })
        this.fieldAxis.player.forEach((element, index) => {
            if(this.isLookField) {
                if(element.y >= this.save.player[index].y + UISize.h) {
                    this.isUpdating = false
                } else {
                    this.isUpdating = true
                }
                if(this.isUpdating) {
                    element.y += moveSpeed
                    
                }
            } else {
                if(element.y <= this.save.player[index].y) {
                    this.isUpdating = false
                } else {
                    this.isUpdating = true
                }
                if(this.isUpdating) {
                    element.y -= moveSpeed
                }
            }
        })
    }
    async init() {
        imageWidth = Loader.get(cardZonePath).width
        imageHeight = Loader.get(cardZonePath).height
        const top = Math.floor(body.getBoundingClientRect().height*dpr/2 - imageHeight + 4)
        const left = Math.floor(body.getBoundingClientRect().width*dpr/2 - imageWidth * this.numOfCardZone/2 + 4 * (this.numOfCardZone-1)/2)
        for(let i = 0; i < 2; i++) {
            for(let n = 0; n < this.numOfCardZone; n++) {
                const dx = left + ((imageWidth - 4) * n)
                const dy = top + ((imageHeight - 4) * i)
                if(i === 0) {
                    this.fieldAxis.opponent.push({x: dx, y: dy - UISize.h})
                    this.save.opponent.push({x: dx, y: dy - UISize.h})
                } else {
                    this.fieldAxis.player.push({x: dx, y: dy - UISize.h})
                    this.save.player.push({x: dx, y: dy - UISize.h})
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
                                    this.selectedCard = undefined
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
        window.addEventListener("keydown", (e) => {
            if(e.key === "ArrowDown") {
                this.isLookField = true
                CardGameUI.lookMode.isOn = true
            } else if(e.key === "ArrowUp") {
                this.isLookField = false
                CardGameUI.lookMode.isOn = true
            }
        })
        for(let i = 0; i < this.numOfCardZone; i++) {
            this.fieldArrange.player.push(undefined)
            this.fieldArrange.opponent.push(undefined)
        }
    }
}