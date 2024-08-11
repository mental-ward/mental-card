import { player } from "../../../..";
import { CardGameEngine } from "../../../card-game/cardGameEngine";
import { Game } from "../../../card-game/Game";
import { Opponent } from "../../../objects/Opponent";
import { Subtitle } from "../../../subtitle/Subtitle";
import { Npc } from "../../entities/Npc";
import { Space } from "../../Space";
import { World } from "../../World";

const body = document.body
const dpr = window.devicePixelRatio

const nurse = new Npc("nurse", {
    x: Math.floor(body.getBoundingClientRect().width / 2 * dpr - 15 * 4 / 2), 
    y: Math.floor(body.getBoundingClientRect().height / 2 * dpr - 31 * 4 / 2), 
    w: 15 * 4, 
    h: 31 * 4
})
nurse.addEventListener("talk", async () => {
    const opponent = new Opponent("loti")
    CardGameEngine.newGame(new Game("test", 5, {player, opponent}))
    CardGameEngine.select("test")
    CardGameEngine.start()
})
export const topSpace = new Space([{tileName: "grass", range: "fill-all"}], [nurse])