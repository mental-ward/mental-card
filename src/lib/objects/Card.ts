import { Wait } from "../etc/Wait"

type info = {cardID: number, name: string, type: number, sacrifice: Array<number>, attack: number, defence: number, health: number, abilities: string}
export class Card {
    public heal: number
    public cardID: number
    public name: string
    public atk: number
    public def: number
    public type: number
    public sacrifice: Array<number>
    public abilities: string
    constructor(info: info){
        this.cardID = info.cardID
        this.name = info.name
        this.type = info.type
        this.sacrifice = info.sacrifice
        this.atk = info.attack
        this.def = info.defence
        this.heal = info.health
        this.abilities = info.abilities
    }
    public async damage(damage: number) {
        for(let i = 0; i < damage; i++) {
            await Wait(0.15/damage)
            this.heal -= 1
            console.log(this.heal)
            if(this.heal <= 0) {
                break
            }
        }
    }
}