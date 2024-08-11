import { Wait } from "../etc/Wait"

type info = {uid: number, id: string, name: string, type: number, sacrifice: Array<number>, attack: number, defence: number, health: number, abilities: {passive: {id: string, name: string, desc: string}, active: {id: string, name: string, desc: string}}}
export class Card {
    public heal: number
    public uid: number
    public id: string
    public name: string
    public atk: number
    public def: number
    public type: number
    public sacrifice: Array<number>
    public abilities: {passive: {id: string, name: string, desc: string}, active: {id: string, name: string, desc: string}}
    public theme: string
    constructor(info: info, theme: string){
        this.uid = info.uid
        this.id = info.id
        this.name = info.name
        this.type = info.type
        this.sacrifice = info.sacrifice
        this.atk = info.attack
        this.def = info.defence
        this.heal = info.health
        this.abilities = info.abilities
        this.theme = theme
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