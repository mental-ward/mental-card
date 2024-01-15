import { Card } from "./Card"

export class Player {
    readonly name: string
    readonly hand = new Map<number, Card>()
    readonly deck = new Map<number, Card>()
    constructor(name: string) {
        this.name = name
    }
    initHand() {
        this.hand.clear()
    }
    addToHand(card: Card) {
        this.hand.set(this.hand.size, card)
        this.updateHand(card)
    }
    addToDeck(card: Card) {
        this.deck.set(this.deck.size, card)
        this.updateDeck()
    }
    removeToDeck(cardID: number) {
        this.deck.delete(cardID)
        this.updateDeck()
    }
    drawCard() {
        let card = this.deck.get(this.deck.size-1)!
        this.removeToDeck(this.deck.size-1)
        this.addToHand(card)
    }
    private updateHand(card: Card) {
        const hand = document.getElementById("player-hand")!
        const newCard = document.createElement("img") as HTMLImageElement
        const body = document.body
        const cardWidth = body.getBoundingClientRect().width/100*10
        newCard.src = "./assets/card/front.png"
        newCard.alt = card.name
        newCard.classList.add("card", "card-on-hand")
        newCard.style.left = `${window.innerWidth - cardWidth - (20 + 5 * this.deck.size)}px`
        newCard.addEventListener("mouseover", () => {
            newCard.style.zIndex = `2`
            newCard.style.transform += `translateY(-20px)`
        })
        newCard.addEventListener("mouseout", () => {
            newCard.style.zIndex = `1`
            newCard.style.transform += `translateY(20px)`
        })
        hand.append(newCard)
        setTimeout(() => {
            newCard.style.left = `${20 + (120 * (this.hand.size - 1))}px`
        }, 0)
        
    }
    private updateDeck() {
        const deck = document.getElementById("player-deck")!
        deck.replaceChildren()
        this.deck.forEach((element: Card, key: number) => {
            const card = document.createElement("img") as HTMLImageElement
            card.src = "./assets/card/back.png"
            card.alt = element.name
            card.classList.add("card")
            card.style.right = `${key*5 + 20}px`
            deck.append(card)
        })
    }
}