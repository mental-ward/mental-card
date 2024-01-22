import { Wait } from "../etc/Wait";
import { Card } from "../objects/Card";
import { Opponent } from "../objects/Opponent";
import { Player } from "../objects/Player";
import { Field } from "./field";
const bell = document.getElementById("bell")!
const cardInfoOnHand = document.getElementById("card-info-on-hand")!
export class Game {
    public isPlayerTurn: boolean = true
    public phase: number = 1 // 0: not player turn; 1: draw phase, 2: new arrange phase, 3: arrange phase, 4: ...
    readonly player: Player
    readonly opponent: Opponent
    private numOfCardZone: number
    private field: Field
    constructor(numOfField: number, entities: {player: Player, opponent: Opponent}) {
        this.player = entities.player
        this.opponent = entities.opponent
        this.numOfCardZone = numOfField
        this.field = new Field(this.numOfCardZone)
    }
    async start() {
        this.init()
        for(let i = 0; i < 3; i++) {
            await Wait(0.3)
            this.drawCard(true)
        }
    }
    public battle() {
        for(let i = 0; i < this.numOfCardZone; i++) {
            if(this.isPlayerTurn) {
                if(this.field.fieldArrange.player[i]) {
                    if(this.field.fieldArrange.opponent[i]) {
                        this.field.fieldArrange.opponent[i]!.heal -= this.field.fieldArrange.player[i]!.atk
                        if(this.field.fieldArrange.opponent[i]!.heal <= 0) {
                            this.field.kill(0, i)
                        }
                    } else {
                        console.log("직접공격") // TODO
                    }
                }
            } else {
                if(this.field.fieldArrange.opponent[i]) {
                    if(this.field.fieldArrange.player[i]) {
                        this.field.fieldArrange.player[i]!.heal -= this.field.fieldArrange.opponent[i]!.atk
                        if(this.field.fieldArrange.player[i]!.heal <= 0) {
                            this.field.kill(1, i)
                        }
                    } else {
                        console.log("직접공격") // TODO
                    }
                }
            }
            
        }
    }
    private turnChange() {
        if(this.isPlayerTurn && this.phase > 1) {
            this.isPlayerTurn = false
            this.phase = 0
            bell.classList.add("bell-hidden")
        } else {
            this.isPlayerTurn = true
            bell.classList.remove("bell-hidden")
        }
    }
    private init() {
        const deck = document.getElementById("player-deck")!
        bell.addEventListener("click", () => {
            if(this.isPlayerTurn && this.phase > 1 && !this.field.isArranging) {
                this.battle()
                this.turnChange()
            }
        })
        if(!this.isPlayerTurn) {
            bell.classList.add("bell-hidden")
        } else {
            bell.classList.remove("bell-hidden")
        }
        this.field.init()
        this.player.initHand()
        deck.addEventListener('click', () => {
            if(this.player.hand.size < 10 && this.player.deck.size > 0) {
                this.drawCard()
            }
        })
    }
    public async newArrange(card: Card) {
        await Wait(0.25)
        this.field.selectCard(card)
        this.phase++
    }
    public addToHand(card: Card) {
        this.player.hand.set(card.uid, card)
    }
    private drawCard(systemAuthority?: boolean) {
        if((this.isPlayerTurn && this.phase === 1) || systemAuthority) {
            let card = this.player.deck.get(this.player.deck.size-1)!
            this.player.removeToDeck(this.player.deck.size-1)
            this.addToHand(card)
            const hand = document.getElementById("player-hand")!
            const newCard = document.createElement("img") as HTMLImageElement
            const body = document.body
            const cardWidth = body.getBoundingClientRect().width/100*10
            newCard.src = "./assets/card/front.png"
            newCard.alt = card.name
            newCard.classList.add("card", "card-on-hand")
            newCard.id = `card-${card.uid}`
            newCard.style.left = `${window.innerWidth - cardWidth - (20 + 5 * this.player.deck.size)}px`
            newCard.addEventListener("mouseover", () => {
                newCard.style.zIndex = `2`
                newCard.style.transform += `translateY(-20px)`
                cardInfoOnHand.innerText = `
                    name: ${card.name}
                    health: ${card.heal}
                    attack: ${card.atk}
                    defence: ${card.def}
                `
            })
            newCard.addEventListener("mouseout", () => {
                newCard.style.zIndex = `1`
                newCard.style.transform += `translateY(20px)`
                cardInfoOnHand.innerText = ""
            })
            hand.append(newCard)
            setTimeout(() => {
                newCard.style.left = `${20 + (120 * (this.player.hand.size - 1))}px`
            }, 50)
            newCard.addEventListener("click", async () => {
                if(this.isPlayerTurn && this.phase === 2) {
                    newCard.style.transform += `translateY(${body.getBoundingClientRect().height/2}px)`
                    this.player.removeToHand(card.uid)
                    this.newArrange(card)
                    await Wait(0.2)
                    hand.removeChild(newCard)
                    let i = 0
                    this.player.hand.forEach((element) => {
                        const cardElement = document.getElementById(`card-${element.uid}`)!
                        cardElement.style.left = `${20 + (120 * (i))}px`
                        i++
                    })
                }
                
            })
            if(!systemAuthority) {
                this.phase++
            }
        }
    }
        
}