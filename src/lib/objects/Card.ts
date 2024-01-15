type info = {name: string, attack: number, defence: number, health: number}
export class Card {
    public name: string
    public atk: number
    public def: number
    constructor(info: info){ 
        this.name = info.name
        this.atk = info.attack
        this.def = info.defence
    }
}