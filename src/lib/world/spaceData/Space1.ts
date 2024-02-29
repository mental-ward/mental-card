import { player } from "../../.."
import Loader from "../../etc/Loader"
import { Game } from "../../game/Game"
import { Opponent } from "../../objects/Opponent"
import { Subtitle } from "../../subtitle/Subtitle"
import { Space } from "../Space"
import { World } from "../World"
import { Npc } from "../entities/Npc"
import { bed } from "../entityData/bed"

const body = document.body
const dpr = window.devicePixelRatio

const nurse = new Npc("nurse", {x: 500, y: Math.floor(body.getBoundingClientRect().height / 2 * dpr - 31 * 4 / 2), w: 15 * 4, h: 31 * 4})
nurse.addEvent("talk", () => {
    Subtitle.on([
        "nurse: 아주 중요한 진실이 있어요.",
        "nurse: 바로...",
        "nurse: 언가는 '바보'입니다.",
    ], () => {
        const opponent = new Opponent("loti")
        const game = new Game(5, {
            player,
            opponent
        })
        World.off()
        game.start()
    })
})

export const space1 = new Space("../public/assets/world/bg/space1/1.png", [
    bed({ x: Math.floor(body.getBoundingClientRect().width / 2 * dpr - 15 * 4 / 2), y: Math.floor(body.getBoundingClientRect().height / 2 * dpr - 26 * 4 / 2) }),
    nurse
])