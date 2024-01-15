import { Wait } from "../etc/Wait";
import { Opponent } from "../objects/Opponent";
import { Player } from "../objects/Player";
import Loader from "../etc/Loader"

export class Game {
    readonly player: Player
    readonly opponent: Opponent
    constructor(entities: {player: Player, opponent: Opponent}) {
        this.player = entities.player
        this.opponent = entities.opponent
    }
    async start() {
        Loader.loadAll([
            "../public/assets/deck-zone.png"
        ]).then(async () => {
            this.init()
            for(let i = 0; i < 3; i++) {
                await Wait(0.35)
                this.player.drawCard()
            }
        })
    }
    private init() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        ctx.drawImage(Loader.get("../public/assets/deck-zone.png"), 0, 0)
        this.player.initHand()
    }
}