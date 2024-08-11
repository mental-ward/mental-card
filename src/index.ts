// import fs from "node:fs"
import { Card } from "./lib/objects/Card"
import { Player } from "./lib/objects/Player"
import { Game } from "./lib/card-game/Game"
import { Opponent } from "./lib/objects/Opponent"
import { Scenario } from "./lib/scenario/Scenario"
import Loader from "./lib/etc/Loader"
import { bird } from "./data/cardData/Bird.json"
import { turtle } from "./data/cardData/Turtle.json"
import { fish } from "./data/cardData/Fish.json"
import { shark } from "./data/cardData/Shark.json"
import { forestGuardian } from "./data/cardData/ForestGuardian.json"
import { Wait } from "./lib/etc/Wait"
import { World } from "./lib/world/World"
import { ArcFade } from "./lib/screenEffect/ArcFade"
import { CardGameEngine } from "./lib/card-game/cardGameEngine"
import { OpacityFade } from "./lib/screenEffect/OpacityFade"
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const fogCanvas = document.getElementById("fog") as HTMLCanvasElement
const dpr = window.devicePixelRatio
const body = document.body


canvas.style.width = `${window.innerWidth}px`
canvas.style.height = `${window.innerHeight}px`
canvas.width = window.innerWidth * dpr
canvas.height = window.innerHeight * dpr
// canvas.style.width = `1920px`
// canvas.style.height = `1080px`
// canvas.width = 1920 * dpr
// canvas.height = 1080 * dpr

fogCanvas.style.width = `1920px`
fogCanvas.style.height = `1080px`
fogCanvas.width = 1920 * dpr
fogCanvas.height = 1080 * dpr


export const player = new Player("tester")
const opponent = new Opponent("loti")
const theme = "leather"
player.addToDeck(new Card({uid: player.deck.size, ...fish}, theme))
player.addToDeck(new Card({uid: player.deck.size, ...fish}, theme))
player.addToDeck(new Card({uid: player.deck.size, ...fish}, theme))
player.addToDeck(new Card({uid: player.deck.size, ...fish}, theme))
player.addToDeck(new Card({uid: player.deck.size, ...bird}, theme))
player.addToDeck(new Card({uid: player.deck.size, ...shark}, theme))

// fs.writeFileSync("../mental_card_data/player.json", JSON.stringify(player)

const card = [
    // default
    "../public/assets/card/default/front.png",
    "../public/assets/card/default/back.png",
    "../public/assets/card/default/backx6.png",
    "../public/assets/card/default/backx5.png",
    "../public/assets/card/default/frontx3.png",
    // leather
    "../public/assets/card/leather/front.png",
    "../public/assets/card/leather/back.png",
    "../public/assets/card/leather/frontx3.png",
    "../public/assets/card/leather/backx3.png",
]
const type = [
    // default
    "../public/assets/part/type/default/1.png",
    "../public/assets/part/type/default/2.png",
    "../public/assets/part/type/default/3.png",
    "../public/assets/part/type/default/1x3.png",
    "../public/assets/part/type/default/2x3.png",
    "../public/assets/part/type/default/3x3.png",
    // leather
    "../public/assets/part/type/leather/1.png",
    "../public/assets/part/type/leather/2.png",
    "../public/assets/part/type/leather/3.png",
    "../public/assets/part/type/leather/1x3.png",
    "../public/assets/part/type/leather/2x3.png",
    "../public/assets/part/type/leather/3x3.png",

]
const monster = [
    // default
    "../public/assets/monster/default/human.png",
    "../public/assets/monster/default/bird.png",
    "../public/assets/monster/default/turtle.png",
    "../public/assets/monster/default/forestGuardian.png",
    "../public/assets/monster/default/shark.png",
    "../public/assets/monster/default/fish.png",
    // leather
    "../public/assets/monster/leather/bird.png",
    "../public/assets/monster/leather/birdx3.png",
    "../public/assets/monster/leather/fish.png",
    "../public/assets/monster/leather/fishx3.png",
    "../public/assets/monster/leather/shark.png",
    "../public/assets/monster/leather/sharkx3.png",
]
const sacrifice = [
    // default
    "../public/assets/part/sacrifice/0.png",
    "../public/assets/part/sacrifice/1.png",
    "../public/assets/part/sacrifice/2.png",
    "../public/assets/part/sacrifice/3.png",
    "../public/assets/part/sacrifice/0x3.png",
    "../public/assets/part/sacrifice/1x3.png",
    "../public/assets/part/sacrifice/2x3.png",
    "../public/assets/part/sacrifice/3x3.png",
    
]
const numbers = [
    // default
    "../public/assets/part/number/0.png",
    "../public/assets/part/number/1.png",
    "../public/assets/part/number/2.png",
    "../public/assets/part/number/3.png",
    "../public/assets/part/number/4.png",
    "../public/assets/part/number/5.png",
    "../public/assets/part/number/6.png",
    "../public/assets/part/number/7.png",
    "../public/assets/part/number/8.png",
    "../public/assets/part/number/9.png",
    "../public/assets/part/number/0x3.png",
    "../public/assets/part/number/1x3.png",
    "../public/assets/part/number/2x3.png",
    "../public/assets/part/number/3x3.png",
    "../public/assets/part/number/4x3.png",
    "../public/assets/part/number/5x3.png",
    "../public/assets/part/number/6x3.png",
    "../public/assets/part/number/7x3.png",
    "../public/assets/part/number/8x3.png",
    "../public/assets/part/number/9x3.png",
]
const bell = [
    // wooden
    "../public/assets/bell/wooden_bell.png",
]
const entity = [
    // player
    "../public/assets/world/entity/player/back.png",
    "../public/assets/world/entity/player/front.png",
    "../public/assets/world/entity/player/left.png",
    "../public/assets/world/entity/player/right.png",
    "../public/assets/world/entity/shadow/shadow.png",
    // npc
    "../public/assets/world/entity/nurse/front.png",
    // stuff
    "../public/assets/world/entity/bed/front.png",
    "../public/assets/world/entity/walls/wall.png",
    // etc
    "../public/assets/world/entity/etc/E.png",
]
const subtitle = [
    // subtitle
    "../public/assets/subtitle/subtitle.png",
    "../public/assets/subtitle/subtitleX6.png",
    // face
    "../public/assets/subtitle/profiles/nurseX6.png",
    "../public/assets/subtitle/profiles/playerX6.png",

]
const tiles = [
    "../public/assets/world/tiles/grass.png",
    "../public/assets/world/tiles/water.png",
]
const playerUI = [
    // wooden
    `../public/assets/playerUI/wooden/X5.png`,
    `../public/assets/playerUI/wooden/behaviorPointBar.png`,
    `../public/assets/playerUI/card_info/wooden.png`,
    `../public/assets/playerUI/card_info/health.png`,
    `../public/assets/playerUI/card_info/atkDef.png`,
    `../public/assets/playerUI/behaviorPoint/wooden.png`,
    "../public/assets/background/1.jpg",
]

Loader.loadAll([
    "../public/assets/card-zone.png",
    "../public/assets/part/abilities/double-attack.png",
].concat(card, type, monster, sacrifice, numbers, bell, entity, subtitle, tiles, playerUI)).then(async () => {
    ArcFade.init()
    OpacityFade.init()
    World.init()
    const opponent = new Opponent("loti")
    CardGameEngine.newGame(new Game("test", 5, {player, opponent}))
    CardGameEngine.select("test")
    CardGameEngine.start()
    // World.on()
})