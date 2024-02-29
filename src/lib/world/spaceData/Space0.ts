import { player } from "../../.."
import Loader from "../../etc/Loader"
import { Game } from "../../game/Game"
import { Opponent } from "../../objects/Opponent"
import { Scenario } from "../../scenario/Scenario"
import { Subtitle } from "../../subtitle/Subtitle"
import { Space } from "../Space"
import { Npc } from "../entities/Npc"
import { bed } from "../entityData/bed"

const body = document.body
const dpr = window.devicePixelRatio

const nurse = new Npc("nurse", {x: 500, y: Math.floor(body.getBoundingClientRect().height / 2 * dpr - 31 * 4 / 2), w: 15 * 4, h: 31 * 4})
Scenario.on() /// @로티넥스 
// nurse.addEvent("talk", () => {
//     Subtitle.on([
//         "nurse: 좋은 아침이야",
//         "nurse: 몸은 좀 어떠니?",
//         "player: ...",
//         "nurse: 어지럽거나 하지는 않니?",
//         "player: .......",
//         "nurse: 음...",
//         "nurse: 많이 심심하지?!",
//         "nurse: 최근 우리 병동에서 유행하는 카드 게임 알고 있니?",
//         "nurse: 한번 해보지 않을래?",
//     ], () => {
//         const opponent = new Opponent("loti")
//         const game = new Game(5, {
//             player,
//             opponent
//         })
//         World.off()
//         game.start()
//     })
// })

export const space0 = new Space("../public/assets/world/bg/space1/1.png", [
    bed({ x: Math.floor(body.getBoundingClientRect().width / 2 * dpr - 15 * 4 / 2), y: Math.floor(body.getBoundingClientRect().height / 2 * dpr - 26 * 4 / 2) }),
    nurse
], 
{
    top: new Space("../public/assets/world/bg/space1/1.png", [])
}
)