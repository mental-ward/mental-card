import { Card } from "./lib/objects/Card"
import { Player } from "./lib/objects/Player"
import { Game } from "./lib/game/Game"
import { Opponent } from "./lib/objects/Opponent"
import { Scenario } from "./lib/scenario/Scenario"
import Loader from "./lib/etc/Loader"
import { humen } from "./cardData/Humen.json"
import { bird } from "./cardData/Bird.json"
import { turtle } from "./cardData/Turtle.json"
import { fish } from "./cardData/Fish.json"
import { shark } from "./cardData/Shark.json"
import { forestGuardian } from "./cardData/ForestGuardian.json"
import { Wait } from "./lib/etc/Wait"
import { World } from "./lib/world/World"
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const dpr = window.devicePixelRatio

canvas.style.width = `${window.innerWidth}px`
canvas.style.height = `${window.innerHeight}px`
canvas.width = window.innerWidth * dpr
canvas.height = window.innerHeight * dpr


const player = new Player("tester")
const opponent = new Opponent("loti")

player.addToDeck(new Card({cardID: player.deck.size, ...bird}))
player.addToDeck(new Card({cardID: player.deck.size, ...bird}))
player.addToDeck(new Card({cardID: player.deck.size, ...bird}))
player.addToDeck(new Card({cardID: player.deck.size, ...bird}))
player.addToDeck(new Card({cardID: player.deck.size, ...shark}))
player.addToDeck(new Card({cardID: player.deck.size, ...fish}))
player.addToDeck(new Card({cardID: player.deck.size, ...fish}))
player.addToDeck(new Card({cardID: player.deck.size, ...fish}))
player.addToDeck(new Card({cardID: player.deck.size, ...turtle}))
player.addToDeck(new Card({cardID: player.deck.size, ...forestGuardian}))

const game = new Game(5, {
    player,
    opponent
})

const scenario = new Scenario()

Loader.loadAll([
    "../public/assets/part/type/1X4.png",
    "../public/assets/part/type/2X4.png",
    "../public/assets/part/type/3X4.png",
    "../public/assets/card-zoneX4.png",
    "../public/assets/card/frontX4.png",
    "../public/assets/monster/humenX4.png",
    "../public/assets/monster/birdX4.png",
    "../public/assets/monster/turtleX4.png",
    "../public/assets/monster/forestGuardianX4.png",
    "../public/assets/monster/sharkX4.png",
    "../public/assets/monster/fishX4.png",

    "../public/assets/world/entity/player/backX4.png",
    "../public/assets/world/entity/player/frontX4.png",
    "../public/assets/world/entity/player/leftX4.png",
    "../public/assets/world/entity/player/rightX4.png",

    "../public/assets/part/abilities/thornX4.png",
    
    "../public/assets/part/sacrifice/0X4.png",
    "../public/assets/part/sacrifice/1X4.png",
    "../public/assets/part/sacrifice/2X4.png",
    "../public/assets/part/sacrifice/3X4.png",
    "../public/assets/part/number/0X4.png",
    "../public/assets/part/number/1X4.png",
    "../public/assets/part/number/2X4.png",
    "../public/assets/part/number/3X4.png",
    "../public/assets/part/number/4X4.png",
    "../public/assets/part/number/5X4.png",
    "../public/assets/part/number/6X4.png",
    "../public/assets/part/number/7X4.png",
    "../public/assets/part/number/8X4.png",
    "../public/assets/part/number/9X4.png",
]).then(async () => {
    World.init()
    World.on()
    await Wait(2)
    World.off()
    game.start()
    await Wait(2)
    game.end()
    World.on()
})