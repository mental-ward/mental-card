import { Card } from "./lib/objects/Card"
import { Player } from "./lib/objects/Player"
import { Game } from "./lib/game/Game"
import { Opponent } from "./lib/objects/Opponent"
import { Scenario } from "./lib/scenario/Scenario"
import Loader from "./lib/etc/Loader"
import { humen } from "./cardData/Humen.json"
import { bird } from "./cardData/Bird.json"
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const dpr = window.devicePixelRatio

canvas.style.width = `${window.innerWidth}px`
canvas.style.height = `${window.innerHeight}px`
canvas.width = window.innerWidth * dpr
canvas.height = window.innerHeight * dpr


const player = new Player("tester")
const opponent = new Opponent("loti")

for(let i = 0; i < 5; i++) {
    player.addToDeck(new Card({cardID: player.deck.size, ...humen}))
    player.addToDeck(new Card({cardID: player.deck.size, ...bird}))
}

const game = new Game(5, {
    player,
    opponent
})

Loader.loadAll([
    "../public/assets/part/type/1X4.png",
    "../public/assets/part/type/2X4.png",
    "../public/assets/part/type/3X4.png",
    "../public/assets/part/sacrificeX4.png",
    "../public/assets/card-zoneX4.png",
    "../public/assets/card/frontX4.png",
    "../public/assets/monster/humenX4.png",
    "../public/assets/monster/birdX4.png",
]).then(() => {
    game.start()
})