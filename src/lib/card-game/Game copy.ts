import { Wait } from "../etc/Wait";
import { Card } from "../objects/Card";
import { Opponent } from "../objects/Opponent";
import { Player } from "../objects/Player";
import { Field } from "./field";
import { test } from "../../data/cardData/test.json"
const body = document.body
const bell = document.getElementById("bell")!
const playerContainer = document.getElementById("player-container")!
const cardInfo = document.getElementById("card-info")!
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

    public async start() {
        this.field.isOn = true
        bell.classList.remove("bell-hidden")
        playerContainer.style.transform = `translate(0px, 0px)`
        cardInfo.style.transform = `translate(0px, 0px)`
        this.init()
        for(const [key, value] of this.opponent.deck) {
            this.opponent.addToHand(value)
        }
        for(let i = 0; i < 3; i++) {
            await Wait(0.3)
            this.drawCard(true)
        }
    }
    public end() {
        this.field.isOn = false
        this.field.init()
        this.player.initHand()
        bell.classList.add("bell-hidden")
        bell.style.transform = `translate(0px, ${body.getBoundingClientRect().height / 100 * 40 + 110}px)`
        playerContainer.style.transform = `translate(0px, ${body.getBoundingClientRect().height / 100 * 40}px)`
        cardInfo.style.transform = `translate(500px, 0px)`
    }

    public numOfCardOnField() {
        let playerCardCount: Array<number> = []
        let opponentCardCount: Array<number> = []
        this.field.fieldArrange.player.map((element) => {
            if(element) {
                playerCardCount.push(element.type)
            }
        })
        this.field.fieldArrange.opponent.map((element) => {
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

    public isApplyDefence(fieldID: number) {
        let opponentCard = this.field.fieldArrange.opponent[fieldID]
        let playerCard = this.field.fieldArrange.player[fieldID]
        if(!this.isPlayerTurn) {
            opponentCard = this.field.fieldArrange.player[fieldID]
            playerCard = this.field.fieldArrange.opponent[fieldID]
        }
        let applyDefence: boolean = false
        if(playerCard && opponentCard) {
            if(playerCard.type === 1) {
                if(opponentCard.type === 2) {
                    applyDefence = true
                }
            } else if(playerCard.type === 2) {
                if(opponentCard.type === 3) {
                    applyDefence = true
                }
            } else if(playerCard.type === 3) {
                if(opponentCard.type === 1) {
                    applyDefence = true
                }
            }
        }
        return applyDefence
    }

    public battle(callback?: Function) {
        
        for(let i = 0; i < this.numOfCardZone; i++) {
            const attackerFieldArrange = this.isPlayerTurn ? this.field.fieldArrange.player[i]! : this.field.fieldArrange.opponent[i]!
            const defenderFieldArrange = !this.isPlayerTurn ? this.field.fieldArrange.player[i]! : this.field.fieldArrange.opponent[i]!
            if(attackerFieldArrange) {
                if(defenderFieldArrange) {
                    const canvasCardObject = this.isPlayerTurn ? this.field.canvasCardObjects.player.get(this.field.fieldArrange.player[i]!.cardID)! : this.field.canvasCardObjects.opponent.get(this.field.fieldArrange.opponent[i]!.cardID)!
                    canvasCardObject.attack(this.isPlayerTurn)
                    let damage: number = 0
                    if(this.isApplyDefence(i)) {
                        damage = defenderFieldArrange.def - attackerFieldArrange.atk >= 0 ? 0 : - (defenderFieldArrange.def - attackerFieldArrange.atk)
                    } else {
                        damage = attackerFieldArrange.atk
                    }
                    
                    defenderFieldArrange.damage(damage).then(() => {
                        if(defenderFieldArrange.heal <= 0) {
                            this.field.kill(this.isPlayerTurn ? 0 : 1, i)
                        }
                        if(attackerFieldArrange.abilities === "double-attack") {
                        
                        }
                        callback!()
                    })
                } else {
                    console.log("직접공격함") // TODO
                }
            }  
        }
    //     for(let i = 0; i < this.numOfCardZone; i++) {
    //         if(this.isPlayerTurn) {
    //             if(this.field.fieldArrange.player[i]) {
    //                 if(this.field.fieldArrange.opponent[i]) {
    //                     const canvasCardObject = this.field.canvasCardObjects.player.get(this.field.fieldArrange.player[i]!.cardID)!
    //                     canvasCardObject.attack(this.isPlayerTurn)
    //                     let damage: number = 0
    //                     if(this.isApplyDefence(i)) {
    //                         damage = this.field.fieldArrange.opponent[i]!.def - this.field.fieldArrange.player[i]!.atk >= 0 ? 0 : -(this.field.fieldArrange.opponent[i]!.def - this.field.fieldArrange.player[i]!.atk)
    //                     } else {
    //                         damage = this.field.fieldArrange.player[i]!.atk
    //                     }
    //                     this.field.fieldArrange.opponent[i]!.damage(damage).then(() => {
    //                         if(this.field.fieldArrange.opponent[i]!.heal <= 0) {
    //                             this.field.kill(0, i)
    //                         }
    //                     })
    //                 } else {
    //                     console.log("직접공격함") // TODO
    //                 }
    //             }
    //         } else {
    //             if(this.field.fieldArrange.opponent[i]) {
    //                 if(this.field.fieldArrange.player[i]) {
    //                     const canvasCardObject = this.field.canvasCardObjects.opponent.get(this.field.fieldArrange.opponent[i]!.cardID)!
    //                     canvasCardObject.attack(this.isPlayerTurn)
    //                     let damage: number = 0
    //                     if(this.isApplyDefence(i)) {
    //                         damage = this.field.fieldArrange.player[i]!.def - this.field.fieldArrange.opponent[i]!.atk >= 0 ? 0 : -(this.field.fieldArrange.player[i]!.def - this.field.fieldArrange.opponent[i]!.atk)
    //                     } else {
    //                         damage = this.field.fieldArrange.opponent[i]!.atk
    //                     }
    //                     this.field.fieldArrange.player[i]!.damage(damage).then(() => {
    //                         if(this.field.fieldArrange.player[i]!.heal <= 0) {
    //                             this.field.kill(1, i)
    //                         }
    //                     })
                        
    //                 } else {
    //                     console.log("직접공격딤함") // TODO
    //                 }
    //             }
    //         }
            
    //     }
    }

    private turnChange() {
        if(this.isPlayerTurn) {
            this.isPlayerTurn = false
            this.phase = 0
            bell.classList.remove("bell-up")
            bell.classList.add("bell-pushed")
            this.intellect()
            console.log("이제 상대턴")
        } else {
            this.phase++
            this.isPlayerTurn = true
            bell.classList.remove("bell-pushed")
            bell.classList.add("bell-up")
            console.log("이제 내턴")
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
            typeImage.classList.add("card-part")
            
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
            const magnification = (cardFrame.getBoundingClientRect().width/156)
            
            typeImage.style.width = `${20 * magnification}px`
            typeImage.style.transform = `translate(${17*4 * magnification}px, ${42*4 * magnification}px)`
            for(let i = 0; i < card.sacrifice.length; i++) {
                const sacrificeImage = document.createElement("img") as HTMLImageElement
                sacrificeImage.src = `../public/assets/part/sacrifice/${card.sacrifice[i]}.png`
                sacrificeImage.classList.add("card-part")
                cardContainer.append(sacrificeImage)
                sacrificeImage.style.width = `${28 * magnification}px`
                sacrificeImage.style.transform = `translate(${4*4 * magnification + (8*4*magnification*i)}px, ${33*4 * magnification}px)`
            }

            cardContainer.append(cardImage)

            if(card.atk < 10) {
                const numberImage = document.createElement("img") as HTMLImageElement
                numberImage.src = `../public/assets/part/number/${card.atk}.png`
                numberImage.classList.add("card-part")
                cardContainer.append(numberImage)
                numberImage.style.width = `${12 * magnification}px`
                numberImage.style.transform = `translate(${52*2 * magnification}px, ${96*2 * magnification}px)`
            } else {
                const numberImage1 = document.createElement("img") as HTMLImageElement
                const numberImage2 = document.createElement("img") as HTMLImageElement
                numberImage1.src = `../public/assets/part/number/${Math.floor(card.atk/10)}.png`
                numberImage2.src = `../public/assets/part/number/${card.atk%10}.png`
                numberImage1.classList.add("card-part")
                numberImage2.classList.add("card-part")
                cardContainer.append(numberImage1, numberImage2)
                numberImage1.style.width = `${12 * magnification}px`
                numberImage2.style.width = `${12 * magnification}px`
                numberImage1.style.transform = `translate(${48*2 * magnification}px, ${96*2 * magnification}px)`
                numberImage2.style.transform = `translate(${56*2 * magnification}px, ${96*2 * magnification}px)`
            }

            if(card.def < 10) {
                const numberImage = document.createElement("img") as HTMLImageElement
                numberImage.src = `../public/assets/part/number/${card.def}.png`
                numberImage.classList.add("card-part")
                cardContainer.append(numberImage)
                numberImage.style.width = `${12 * magnification}px`
                numberImage.style.transform = `translate(${65*2 * magnification}px, ${112*2 * magnification}px)`
            } else {
                const numberImage1 = document.createElement("img") as HTMLImageElement
                const numberImage2 = document.createElement("img") as HTMLImageElement
                numberImage1.src = `../public/assets/part/number/${Math.floor(card.def/10)}.png`
                numberImage2.src = `../public/assets/part/number/${card.def%10}.png`
                numberImage1.classList.add("card-part")
                numberImage2.classList.add("card-part")
                cardContainer.append(numberImage1, numberImage2)
                numberImage1.style.width = `${12 * magnification}px`
                numberImage2.style.width = `${12 * magnification}px`
                numberImage1.style.transform = `translate(${61*2 * magnification}px, ${112*2 * magnification}px)`
                numberImage2.style.transform = `translate(${69*2 * magnification}px, ${112*2 * magnification}px)`
            }

            if(card.heal < 10) {
                const numberImage = document.createElement("img") as HTMLImageElement
                numberImage.src = `../public/assets/part/number/${card.heal}.png`
                numberImage.classList.add("card-part")
                cardContainer.append(numberImage)
                numberImage.style.width = `${12 * magnification}px`
                numberImage.style.transform = `translate(${13*2 * magnification}px, ${103*2 * magnification}px)`
            } else {
                const numberImage1 = document.createElement("img") as HTMLImageElement
                const numberImage2 = document.createElement("img") as HTMLImageElement
                numberImage1.src = `../public/assets/part/number/${Math.floor(card.heal/10)}.png`
                numberImage2.src = `../public/assets/part/number/${card.heal%10}.png`
                numberImage1.classList.add("card-part")
                numberImage2.classList.add("card-part")
                cardContainer.append(numberImage1, numberImage2)
                numberImage1.style.width = `${12 * magnification}px`
                numberImage2.style.width = `${12 * magnification}px`
                numberImage1.style.transform = `translate(${9*2 * magnification}px, ${103*2 * magnification}px)`
                numberImage2.style.transform = `translate(${17*2 * magnification}px, ${103*2 * magnification}px)`
            }

            cardContainer.style.height = `${260 * magnification}px`

            setTimeout(() => {
                cardContainer.style.left = `${20 + (120 * (this.player.hand.size - 1))}px`
            }, 50)

            cardContainer.addEventListener("click", async () => {
                if(this.isPlayerTurn && !this.field.isArranging && !this.field.isSacrificing) {
                    if(this.numOfCardOnField().player.total >= card.sacrifice.length) {
                        if(this.numOfCardOnField().player.types[1] >= card.sacrifice.filter((element) => element === 1).length) {
                            if(this.numOfCardOnField().player.types[2] >= card.sacrifice.filter((element) => element === 2).length) {
                                if(this.numOfCardOnField().player.types[3] >= card.sacrifice.filter((element) => element === 3).length) {
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
                            }
                        }
                    }
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
        this.battle(() => {
            this.turnChange()
        })
    }

    private init() {
        const deck = document.getElementById("player-deck")!
        bell.addEventListener("click", () => {
            if(this.isPlayerTurn && (this.phase > 1 || this.player.deck.size <= 0) && !this.field.isArranging && !this.field.isSacrificing) {
                this.battle(() => {
                    this.turnChange()
                })
            }
        })
        bell.classList.add("bell-pushed")
        if(this.isPlayerTurn) {
            bell.classList.remove("bell-pushed")
        } else {
            bell.classList.add("bell-pushed")
        }
        this.field.init()
        this.player.initHand()

        // this.field.placeCard(new Card({cardID: 10, ...test}), 0, false)
        // this.field.placeCard(new Card({cardID: 11, ...test}), 1, false)
        // this.field.placeCard(new Card({cardID: 12, ...test}), 2, false)
        // this.field.placeCard(new Card({cardID: 13, ...test}), 3, false)
        this.field.placeCard(new Card({cardID: 14, ...test},""), 4, false)

        deck.addEventListener('click', () => {
            if(this.player.hand.size < 10 && this.player.deck.size > 0) {
                this.drawCard()
            }
        })
    }
}