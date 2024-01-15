import { Card } from "./lib/objects/Card"
import { Player } from "./lib/objects/Player"
import { Game } from "./lib/game/Game"
import { Opponent } from "./lib/objects/Opponent"
import { Scenario } from "./lib/scenario/Scenario"
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

canvas.style.width = `${window.innerWidth}px`
canvas.style.height = `${window.innerHeight}px`
canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.fillStyle = "#000"
ctx.fillRect(canvas.width/2-25, canvas.height/100*60-50, 50, 50)

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

const game = new Game({
    player,
    opponent
})


const scenario = new Scenario()
scenario.on()
setTimeout(() => {
    scenario.off().then(() => {
        game.start()
    })
}, 2000)