import { CanvasCardObject } from "../cardObject/CanvasCardObject"
import { CanvasObject } from "../cardObject/CanvasObject"
import Loader from "../etc/Loader"
import { Wait } from "../etc/Wait"
import { Card } from "../objects/Card"
import { Player } from "../objects/Player"
import { Game } from "./Game"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const body = document.body
const dpr = window.devicePixelRatio

const UISize = {w: 1500, h: 375}
const behaviorPointBarSize = {w:450, h: 108}
const cardSize = {w: 156, h: 260}
const bellSize = {w: 92, h: 300}
const behaviorPointSize =  {w: 60, h: 60}
const cardInfoSize = {w: 520, h: 520}
const monsterImageSize = {w: 156, h: 136}

const mouse = {x: 0, y: 0}
let mouseClick = {left: false, right: false}
const bell = new CanvasObject("../public/assets/bell/wooden_bell.png", {x:body.getBoundingClientRect().width*dpr - bellSize.w - 50, y: (body.getBoundingClientRect().height*dpr-UISize.h) - bellSize.h + 16})
const objs = [
    bell,
    new CanvasObject(`../public/assets/playerUI/wooden/X5.png`, {x: 15*dpr, y: (body.getBoundingClientRect().height*dpr-UISize.h)}),
    new CanvasObject(`../public/assets/playerUI/wooden/X5.png`, {x: (body.getBoundingClientRect().width*dpr-UISize.w*20/100), y: (body.getBoundingClientRect().height*dpr-UISize.h)}),
    new CanvasObject(`../public/assets/playerUI/wooden/behaviorPointBar.png`, {x: UISize.w - behaviorPointBarSize.w - 10, y: body.getBoundingClientRect().height*dpr-UISize.h - behaviorPointBarSize.h + 18})

]
let bellAnimation = {isOn: false, moveCount: 1}
const isMouseOnObj = (posSpec: {x: number, y: number, w: number, h: number}) => {return (mouse.x >= posSpec.x/dpr && mouse.x < (posSpec.x+posSpec.w)/dpr) && (mouse.y >= posSpec.y/dpr && mouse.y < (posSpec.y+posSpec.h)/dpr)}

export class CardGameUI {
    static playerBehaviorState = {
        isDrawing: false,
        isSummonning: false
    }
    static selectedGame: Game
    static moveCount: number = 0
    static currentCardIndex: number = 0
    static hand = {
        card: new Map<number, Card>(),
        canvasObj: new Map<number, CanvasCardObject>()
    }
    static deck = {
        canvasObj: new Map<number, CanvasObject>()
    }
    static behaviorObj = {
        canvasObj: new Map<number, CanvasObject>()
    }
    static backgorund = {
        canvasObj: new Map<number, CanvasObject>()
    }
    static objects = new Map<number, CanvasObject>()
    static storeCardYAxis = (body.getBoundingClientRect().height*dpr-UISize.h+(UISize.h-cardSize.h)/2)
    static MouseOverCard: CanvasCardObject | undefined = undefined
    static drawAnimation: {card: CanvasCardObject | undefined, to: number, isDone: boolean} = {
        card: undefined,
        to: 0,
        isDone: false
    }
    static handUpdateKey: number = -1
    static selectedCard: Card | undefined
    static lookMode = {
        cv: 0,
        isOn: false
    }
    static async init(game: Game) {
        this.selectedGame = game
        // objects init ==========>
        objs.forEach((obj) => {
            this.objects.set(this.objects.size, obj)
        })
        this.selectedGame.player.deck.forEach((card, key) => {
            const obj = new CanvasObject(`../public/assets/card/${card.theme}/back.png`, {x: (body.getBoundingClientRect().width*dpr-UISize.w*20/100)+(UISize.w*20/100-cardSize.w)/2-key*2, y:(body.getBoundingClientRect().height*dpr-UISize.h+(UISize.h-cardSize.h)/2)-key*2})
            this.deck.canvasObj.set(this.deck.canvasObj.size, obj)
        })
        for(let i = 0; i < this.selectedGame.behaviorPoint.player; i++) {
            const obj = new CanvasObject(`../public/assets/playerUI/behaviorPoint/wooden.png`, {x: UISize.w - behaviorPointBarSize.w + 18 + 30*(i), y: body.getBoundingClientRect().height*dpr-UISize.h - behaviorPointBarSize.h + (behaviorPointBarSize.h - behaviorPointSize.h)/2  + 18})
            this.behaviorObj.canvasObj.set(this.behaviorObj.canvasObj.size, obj)
        }
        for(let i = 0; i < 4; i++) {
            for(let n = 0; n < 3; n++) {
                const obj = new CanvasObject("../public/assets/background/1.jpg", {x: 600*i, y: 600*n-600})
                this.backgorund.canvasObj.set(this.backgorund.canvasObj.size, obj)
            }
        }
        // ==========>
        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        })
        window.addEventListener("mouseup", (e) => {
            if(e.button === 0) {
                mouseClick.left = true
            } else if(e.button === 2) {
                mouseClick.right = true
            }
        })
        for(let i = 0; i < 3; i++) {
            await Wait(0.3)
            this.drawCard()
        }
    }
    static load() {
        if(this.selectedGame) {
            this.lookModeAnimate()

            this.backgorund.canvasObj.forEach((obj) => {
                obj.load()
            })
            this.objects.forEach((obj) => {
                obj.load()
            })
            this.deck.canvasObj.forEach((obj) => {
                obj.load()
            })
            this.hand.canvasObj.forEach((obj) => {
                obj.load()
            })
            this.behaviorObj.canvasObj.forEach((obj) => {
                obj.load()
            })
            if(!this.lookMode.isOn) {
                this.drawAnimate()
                this.overAnimate()
                if(this.handUpdateKey >= 0) {
                    this.updateHand(this.handUpdateKey)
                }
            }
            
            this.summonAnimate()
            this.mouseOverBellAnimate()
            this.hitTheBell()
            this.hitTheBellAnimate()
            this.showInfo()
            
            mouseClick.left = false
            mouseClick.right = false
        }
    }
    private static lookModeAnimate() {
        const moveSpeed = 15
        if(this.selectedGame.field.isLookField) {
            if(this.lookMode.isOn) {
                if(this.lookMode.cv >= UISize.h) {
                    this.lookMode.isOn = false
                    this.objects.forEach((obj) => {
                        obj.save()
                    })
                    this.hand.canvasObj.forEach((obj) => {
                        obj.save()
                    })
                    this.deck.canvasObj.forEach((obj) => {
                        obj.save()
                    })
                    this.behaviorObj.canvasObj.forEach((obj) => {
                        obj.save()
                    })
                    this.backgorund.canvasObj.forEach((obj) => {
                        obj.save()
                    })
                } else {
                    this.lookMode.isOn = true
                    this.objects.forEach((obj) => {
                        obj.moveTo(obj.savedPos.x, obj.savedPos.y + UISize.h, moveSpeed)
                    })
                    this.hand.canvasObj.forEach((obj) => {
                        obj.moveTo(obj.savedPos.x, obj.savedPos.y + UISize.h, moveSpeed)
                    })
                    this.deck.canvasObj.forEach((obj) => {
                        obj.moveTo(obj.savedPos.x, obj.savedPos.y + UISize.h, moveSpeed)
                    })
                    this.behaviorObj.canvasObj.forEach((obj) => {
                        obj.moveTo(obj.savedPos.x, obj.savedPos.y + UISize.h, moveSpeed)
                    })
                    this.backgorund.canvasObj.forEach((obj) => {
                        obj.moveTo(obj.savedPos.x, obj.savedPos.y + UISize.h, moveSpeed)
                    })
                    this.lookMode.cv += moveSpeed
                }
            }
            
        } else {
            if(this.lookMode.isOn) {
                if(this.lookMode.cv <= 0) {
                    this.lookMode.isOn = false
                    this.objects.forEach((obj) => {
                        obj.save()
                    })
                    this.hand.canvasObj.forEach((obj) => {
                        obj.save()
                    })
                    this.deck.canvasObj.forEach((obj) => {
                        obj.save()
                    })
                    this.behaviorObj.canvasObj.forEach((obj) => {
                        obj.save()
                    })
                    this.backgorund.canvasObj.forEach((obj) => {
                        obj.save()
                    })
                } else {
                    this.lookMode.isOn = true
                    this.objects.forEach((obj) => {
                        obj.moveTo(obj.savedPos.x, obj.savedPos.y -  UISize.h, moveSpeed)
                    })
                    this.hand.canvasObj.forEach((card) => {
                        card.moveTo(card.savedPos.x, card.savedPos.y -  UISize.h, moveSpeed)
                    })
                    this.deck.canvasObj.forEach((obj) => {
                        obj.moveTo(obj.savedPos.x, obj.savedPos.y - UISize.h, moveSpeed)
                    })
                    this.behaviorObj.canvasObj.forEach((obj) => {
                        obj.moveTo(obj.savedPos.x, obj.savedPos.y - UISize.h, moveSpeed)
                    })
                    this.backgorund.canvasObj.forEach((obj) => {
                        obj.moveTo(obj.savedPos.x, obj.savedPos.y - UISize.h, moveSpeed)
                    })
                    this.lookMode.cv -= moveSpeed
                }
            }
        }
    }
    private static showInfo() {
        if(mouseClick.left) {
            this.selectedCard = undefined
        }
        this.selectedGame.field.fieldAxis.opponent.forEach((element, index) => {
            if(isMouseOnObj({x: element.x, y: element.y, w: cardSize.w/2*3, h: cardSize.h/2*3}) && mouseClick.right) {
                this.selectedCard = this.selectedGame.field.fieldArrange.opponent[index]
            }
        })
        this.selectedGame.field.fieldAxis.player.forEach((element, index) => {
            if(isMouseOnObj({x: element.x, y: element.y, w: cardSize.w/2*3, h: cardSize.h/2*3}) && mouseClick.right) {
                this.selectedCard = this.selectedGame.field.fieldArrange.player[index]
            }
        })
        if(this.selectedCard) {
            const sideGap =  (cardInfoSize.w - monsterImageSize.w*3)/2
            const topMargin = (body.getBoundingClientRect().height*dpr - UISize.h - cardInfoSize.h) / 2 + 70
            ctx.drawImage(Loader.get(`../public/assets/playerUI/card_info/wooden.png`), 24, (body.getBoundingClientRect().height*dpr - UISize.h - cardInfoSize.h) / 2)
            ctx.drawImage(Loader.get(`../public/assets/playerUI/card_info/health.png`), 24 + sideGap, topMargin)
            ctx.drawImage(Loader.get(`../public/assets/monster/${this.selectedCard.theme}/${this.selectedCard.id}.png`), 24 + sideGap + monsterImageSize.w, topMargin)
            ctx.drawImage(Loader.get(`../public/assets/playerUI/card_info/atkDef.png`), 24 + sideGap + monsterImageSize.w*2, topMargin)
            ctx.font = "bold 20px Arial"
            ctx.fillText(this.selectedCard.abilities.active.name, 24 + sideGap, topMargin*2)
            ctx.fillText(this.selectedCard.abilities.active.desc, 24 + sideGap, topMargin*2+30)
        }
    }
    static addToHand(card: Card) { // TODO
        this.selectedGame.player.hand.set(card.uid, card)
    }
    private static hitTheBell() {
        if(this.selectedGame.isPlayerTurn) {
            if(mouseClick.left) {
                if((mouse.x >= bell.savedPos.x/dpr && mouse.x < (bell.savedPos.x+bellSize.w)/dpr) && (mouse.y >= bell.savedPos.y/dpr && mouse.y < (bell.savedPos.y+bellSize.h)/dpr)) {
                    this.selectedGame.isPlayerTurn = false
                    this.selectedGame.countOfTurn += 1
                    bellAnimation.isOn = true
                }
            }
        }
    }
    private static hitTheBellAnimate() {
        if(bellAnimation.isOn) {
            if(bellAnimation.moveCount === 4) {
                bell.moveTo(bell.savedPos.x, bell.savedPos.y, 2)
                if(bell.x === bell.savedPos.x) {
                    bellAnimation.isOn = false
                    bellAnimation.moveCount = 1
                }
            } else {
                if((bellAnimation.moveCount % 2) === 0) {
                    bell.moveTo(bell.savedPos.x-10, bell.savedPos.y-20, 2)
                } else {
                    bell.moveTo(bell.savedPos.x+10, bell.savedPos.y-20, 2)
                }
                if((bell.x === bell.savedPos.x-10) || (bell.x === bell.savedPos.x+10)) {
                    bellAnimation.moveCount += 1
                }
            }
        }
    }
    private static mouseOverBellAnimate() {
        if(!bellAnimation.isOn && !this.lookMode.isOn) {
            if(this.selectedGame.isPlayerTurn) {
                if((mouse.x >= bell.savedPos.x/dpr && mouse.x < (bell.savedPos.x+bellSize.w)/dpr) && (mouse.y >= bell.savedPos.y/dpr && mouse.y < (bell.savedPos.y+bellSize.h)/dpr)) {
                    bell.moveTo(bell.savedPos.x, bell.savedPos.y-20, 10)
                } else {
                    bell.moveTo(bell.savedPos.x, bell.savedPos.y, 10)
                }
            } else {
                bell.moveTo(bell.savedPos.x, bell.savedPos.y, 10)
            }
        }
    }
    private static async summon(card: Card) {
        this.selectedGame.field.isLookField = true
        this.lookMode.isOn = true
        this.selectedGame.field.selectCard(card, this.selectedGame.isPlayerTurn)
        this.selectedGame.behaviorPoint.player -= 1
    }
    private static summonAnimate() {
        if(this.selectedGame.behaviorPoint.player > 0) {
            if(!this.playerBehaviorState.isDrawing) {
                const randerArr: Array<{key: number, value: CanvasCardObject}> = []
                this.hand.canvasObj.forEach((card, key) => {
                    randerArr.push({key: key, value: card})
                })
                randerArr.reverse().forEach((canvasObj) => {
                    const card = this.hand.card.get(canvasObj.key)!
                    if(mouseClick.left) {
                        if((mouse.x >= canvasObj.value.x/dpr && mouse.x < (canvasObj.value.x+cardSize.w)/dpr) && (mouse.y >= canvasObj.value.y/dpr && mouse.y < (canvasObj.value.y+cardSize.h)/dpr)) {
                            if(this.hand.canvasObj.has(canvasObj.key)) {
                                const sacrificeCondition = {
                                    total: this.selectedGame.field.numOfCardOnField().player.total >= card.sacrifice.length,
                                    type1: this.selectedGame.field.numOfCardOnField().player.types[1] >= card.sacrifice.filter((element) => element === 1).length,
                                    type2: this.selectedGame.field.numOfCardOnField().player.types[2] >= card.sacrifice.filter((element) => element === 2).length,
                                    type3: this.selectedGame.field.numOfCardOnField().player.types[3] >= card.sacrifice.filter((element) => element === 3).length
                                }
                                if(sacrificeCondition.total && sacrificeCondition.type1 && sacrificeCondition.type2 && sacrificeCondition.type3) {
                                    if(!this.selectedGame.field.selectedCard) {
                                        this.summon(this.hand.card.get(canvasObj.key)!)
                                        this.hand.canvasObj.delete(canvasObj.key)
                                        this.hand.card.delete(canvasObj.key)
                                        this.handUpdateKey = canvasObj.key
                                    }
                                }
                            }
                            
                        }
                    }
                })
            }
        }
    }
    private static overAnimate() {
        const randerArr: Array<CanvasCardObject> = []
        this.hand.canvasObj.forEach((card) => {
            randerArr.push(card)
        })
        const overCardsArr = randerArr.reverse().filter((card) => (mouse.x >= card.x/dpr && mouse.x < (card.x+cardSize.w)/dpr) && (mouse.y >= card.y/dpr && mouse.y < (card.y+cardSize.h)/dpr))
        const notOverCardsArr = randerArr.reverse().filter((card) => !((mouse.x >= card.x/dpr && mouse.x < (card.x+cardSize.w)/dpr) && (mouse.y >= card.y/dpr && mouse.y < (card.y+cardSize.h)/dpr)))
        if(overCardsArr.length > 0) {
            overCardsArr[0].moveTo(overCardsArr[0].x, overCardsArr[0].savedPos.y-20, 10)
            if(overCardsArr.length > 1) {
                notOverCardsArr.push(overCardsArr[1])
            }
        }
        notOverCardsArr.forEach((card) => {
            card.moveTo(card.x, card.savedPos.y, 10)
        })
    }
    private static updateHand(deletedCardKey: number) {
        for(let i = 0; i < this.hand.card.size - deletedCardKey+1; i++) {
            const card = this.hand.canvasObj.get(deletedCardKey+1+i)
            if(card) {
                card.moveTo(20+30+(deletedCardKey+i)*120, card.y, 30)
            }
        }
    }
    private static drawAnimate() {
        this.selectedGame.player.deck.forEach((_card, key) => {
            const card = {
                x: (body.getBoundingClientRect().width*dpr-UISize.w*20/100)+(UISize.w*20/100-cardSize.w)/2-key*2,
                y: (body.getBoundingClientRect().height*dpr-UISize.h+(UISize.h-cardSize.h)/2)
            }
            if(!this.playerBehaviorState.isDrawing) {
                if(mouseClick.left) {
                    if((mouse.x >= card.x/dpr && mouse.x < (card.x+cardSize.w)/dpr) && (mouse.y >= card.y/dpr && mouse.y < (card.y+cardSize.h)/dpr)) {
                        this.playerBehaviorState.isDrawing = true
                        this.drawCard()
                    }
                }
            }
            
        })
        if(this.drawAnimation.card) {
            this.drawAnimation.card.moveTo(this.drawAnimation.to, this.drawAnimation.card.y, 100)
            if(this.drawAnimation.card.x === this.drawAnimation.to) {
                this.drawAnimation.card.save()
                this.drawAnimation.card = undefined
                this.playerBehaviorState.isDrawing = false
            }
        }
    }
    private static drawCard() {
        this.currentCardIndex = this.selectedGame.player.deck.size-1
        let card = this.selectedGame.player.deck.get(this.currentCardIndex)!
        const canvasCard = new CanvasCardObject(card, true, {x: (body.getBoundingClientRect().width*dpr-UISize.w*20/100)+(UISize.w*20/100-cardSize.w)/2-this.selectedGame.player.deck.size*2, y: (body.getBoundingClientRect().height*dpr-UISize.h+(UISize.h-cardSize.h)/2)}, card.theme)
        this.drawAnimation.card = canvasCard
        this.drawAnimation.to = 20+30+(this.hand.canvasObj.size)*120
        this.selectedGame.player.removeToDeck(this.currentCardIndex)
        this.deck.canvasObj.delete(this.deck.canvasObj.size-1)
        this.addToHand(card)
        this.hand.card.set(this.hand.card.size, card)
        this.hand.canvasObj.set(this.hand.canvasObj.size, canvasCard)
    }
}