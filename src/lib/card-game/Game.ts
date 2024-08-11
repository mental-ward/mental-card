import { Opponent } from "../objects/Opponent";
import { Player } from "../objects/Player";
import { Field } from "./field";
export class Game {
    readonly gameName: string
    readonly player: Player
    readonly opponent: Opponent
    readonly numOfCardZone: number
    public field: Field
    public countOfTurn: number = 0
    public isPlayerTurn: boolean = true
    public behaviorPoint: {player: number, opponent: number} = {
        player: 5,
        opponent: 2
    }
    constructor(gameName: string, numOfField: number, entities: {player: Player, opponent: Opponent}) {
        this.gameName = gameName
        this.player = entities.player
        this.opponent = entities.opponent
        this.numOfCardZone = numOfField
        this.field = new Field(this.numOfCardZone)
    }
}