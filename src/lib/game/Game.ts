import { Wait } from "../etc/Wait";
import { Opponent } from "../objects/Opponent";
import { Player } from "../objects/Player";
import { Field } from "./field";

export class Game {
    readonly player: Player
    readonly opponent: Opponent
    private numOfField: number
    constructor(numOfField: number, entities: {player: Player, opponent: Opponent}) {
        this.player = entities.player
        this.opponent = entities.opponent
        this.numOfField = numOfField
    }
    async start() {
        this.init()
        for(let i = 0; i < 3; i++) {
            await Wait(0.35)
            this.player.drawCard()
        }
    }
    private init() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        const field = new Field(this.numOfField)
        field.draw()
        this.player.initHand()
    }
}