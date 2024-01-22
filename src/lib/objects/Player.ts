import { Card } from "./Card"

export class Player {
    readonly name: string
    public hand = new Map<number, Card>()
    public deck = new Map<number, Card>()
    constructor(name: string) {
        this.name = name
    }
    public initHand() {
        this.hand.clear()
    }
    public addToDeck(card: Card) {
        this.deck.set(this.deck.size, card)
        this.updateDeck()
    }
    public removeToDeck(cardID: number) {
        this.deck.delete(cardID)
        this.updateDeck()
    }
    public removeToHand(cardUID: number) {
        this.hand.delete(cardUID)
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