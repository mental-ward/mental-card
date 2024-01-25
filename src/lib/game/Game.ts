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
        for(const [key, value] of this.opponent.deck) {
            this.opponent.addToHand(value)
        }
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
                        console.log("직접공격함") // TODO
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
                        console.log("직접공격딤함") // TODO
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
            this.intellect()
        } else {
            this.phase++
            this.isPlayerTurn = true
            bell.classList.remove("bell-hidden")
        }
    }
    public async newArrange(card: Card) {
        await Wait(0.25)
        this.field.selectCard(card, this.isPlayerTurn)
        this.phase++
    }
    public addToHand(card: Card) {
        this.player.hand.set(card.cardID, card)
    }
    private drawCard(systemAuthority?: boolean) {
        if((this.isPlayerTurn && this.phase === 1) || systemAuthority) {
            let card = this.player.deck.get(this.player.deck.size-1)!
            this.player.removeToDeck(this.player.deck.size-1)
            this.addToHand(card)
            const hand = document.getElementById("player-hand")!
            const cardContainer = document.createElement("div")
            const cardFrame = document.createElement("img") as HTMLImageElement
            const cardImage = document.createElement("img") as HTMLImageElement
            const typeImage = document.createElement("img") as HTMLImageElement
            const body = document.body
            const cardWidth = body.getBoundingClientRect().width/100*10

            cardFrame.src = "./assets/card/front.png"
            cardImage.src = `../public/assets/monster/${card.name}.png`
            typeImage.src = `../public/assets/part/type/${card.type}.png`
            

            cardContainer.classList.add("card", "card-on-hand")
            cardFrame.classList.add("card-part")
            cardImage.classList.add("card-part")
            typeImage.classList.add("card-part-type")
            

            cardContainer.append(cardImage)
            cardContainer.append(cardFrame)
            cardContainer.append(typeImage)

            cardContainer.id = `card-${card.cardID}`
            cardContainer.style.left = `${window.innerWidth - cardWidth - (20 + 5 * this.player.deck.size)}px`
            cardContainer.addEventListener("mouseover", () => {
                cardContainer.style.zIndex = `2`
                cardContainer.style.transform += `translateY(-20px)`
                cardInfoOnHand.innerText = `
                cardID: ${card.cardID}
                name: ${card.name}
                type: ${card.type}
                sacrifice: ${card.sacrifice}
                health: ${card.heal}
                attack: ${card.atk}
                defence: ${card.def}
                `
            })
            cardContainer.addEventListener("mouseout", () => {
                cardContainer.style.zIndex = `1`
                cardContainer.style.transform += `translateY(20px)`
                cardInfoOnHand.innerText = ""
            })

            hand.append(cardContainer)
            const magnification = (cardFrame.getBoundingClientRect().width/39)
            
            typeImage.style.width = `${5 * magnification}px`
            typeImage.style.transform = `translate(${17 * magnification}px, ${28 * magnification}px)`
            for(let i = 0; i < card.sacrifice; i++) {
                const sacrificeImage = document.createElement("img") as HTMLImageElement
                sacrificeImage.src = `../public/assets/part/sacrificeX4.png`
                sacrificeImage.classList.add("card-part-sacrifice")
                cardContainer.append(sacrificeImage)
                sacrificeImage.style.width = `${5 * magnification}px`
                sacrificeImage.style.transform = `translate(${2 * magnification + (6*magnification*i)}px, ${34 * magnification}px)`
            }
            cardContainer.style.height = `${65 * magnification}px`

            setTimeout(() => {
                cardContainer.style.left = `${20 + (120 * (this.player.hand.size - 1))}px`
            }, 50)

            cardContainer.addEventListener("click", async () => {
                if(this.isPlayerTurn && this.phase <= 2) {
                    cardContainer.style.transform += `translateY(${body.getBoundingClientRect().height/2}px)`
                    this.player.removeToHand(card.cardID)
                    this.newArrange(card)
                    await Wait(0.2)
                    hand.removeChild(cardContainer)
                    let i = 0
                    this.player.hand.forEach((element) => {
                        const cardElement = document.getElementById(`card-${element.cardID}`)!
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
    private async intellect() {
        let bestHighDamage: number = 0
        let bestCard: Card
        let bestArrange: number
        const opponentsHand = this.opponent.hand
        const opponentsField = this.field.fieldArrange.opponent
        const playersField = this.field.fieldArrange.player
        console.log(opponentsHand)
        for(const [_key, value] of opponentsHand) {
            for(let i = 0; i < this.numOfCardZone; i++) {
                if(playersField[i] && !opponentsField[i]) {
                    const totalDamage = value.atk
                    if(bestHighDamage < totalDamage) {
                        bestHighDamage = totalDamage
                        bestCard = value
                        bestArrange = i
                    }
                } else {
                    
                }
                
            }
        }
        if(bestCard!)  {
            await Wait(1)
            this.field.placeCard(bestCard!, bestArrange!, this.isPlayerTurn)
            this.opponent.removeToHand(bestCard!.cardID)
        }
        await Wait(1)
        this.battle()
        this.turnChange()
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
}