import { Card } from "./Card"

export class Opponent {
    readonly name: string
    public hand = new Map<number, Card>()
    public deck = new Map<number, Card>()
    constructor(name: string) {
        this.name = name
    }
    public addToHand(card: Card) {
        this.hand.set(card.cardID, card)
    }
    public addToDeck(card: Card) {
        this.deck.set(this.deck.size, card)
    }
    public removeToHand(cardUID: number) {
        this.hand.delete(cardUID)
    }
    public removeToDeck(cardID: number) {
        this.deck.delete(cardID)
    }
}