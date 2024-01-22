type info = {uid: number, name: string, attack: number, defence: number, health: number}
export class Card {
    public heal: number
    public uid: number
    public name: string
    public atk: number
    public def: number
    constructor(info: info){
        this.uid = info.uid
        this.name = info.name
        this.atk = info.attack
        this.def = info.defence
        this.heal = info.health
    }
}