type info = {cardID: number, name: string, type: number, sacrifice: number, attack: number, defence: number, health: number}
export class Card {
    public heal: number
    public cardID: number
    public name: string
    public atk: number
    public def: number
    public type: number
    public sacrifice: number
    constructor(info: info){
        this.cardID = info.cardID
        this.name = info.name
        this.type = info.type
        this.sacrifice = info.sacrifice
        this.atk = info.attack
        this.def = info.defence
        this.heal = info.health
    }
}