import { Card } from "./lib/objects/Card"
import { Player } from "./lib/objects/Player"
import { Game } from "./lib/game/Game"
import { Opponent } from "./lib/objects/Opponent"
import { Scenario } from "./lib/scenario/Scenario"
import Loader from "./lib/etc/Loader"
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const dpr = window.devicePixelRatio

canvas.style.width = `${window.innerWidth}px`
canvas.style.height = `${window.innerHeight}px`
canvas.width = window.innerWidth * dpr
canvas.height = window.innerHeight * dpr

const deck = document.getElementById("player-deck")!
const cardInfo = {
    name: "loti",
    attack: 10,
    defence: 10,
    health: 10
}
const card = new Card(cardInfo)
const player = new Player("tester")
const opponent = new Opponent()

deck.addEventListener('click', () => {
    if(player.hand.size < 10 && player.deck.size > 0) {
        player.drawCard()
    }
})

for(let i = 0; i < 30; i++) {
    player.addToDeck(card)
}

const game = new Game(5, {
    player,
    opponent
})

Loader.loadAll([
    "../public/assets/deck-zone.png",
    "../public/assets/card-zoneX3.png",
    "../public/assets/card-zoneX4.png",
    "../public/assets/card-zoneX5.png"
]).then(() => {
    game.start()
})