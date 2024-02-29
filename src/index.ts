// import fs from "node:fs"
import { Card } from "./lib/objects/Card"
import { Player } from "./lib/objects/Player"
import { Game } from "./lib/game/Game"
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
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const dpr = window.devicePixelRatio

canvas.style.width = `${window.innerWidth}px`
canvas.style.height = `${window.innerHeight}px`
canvas.width = window.innerWidth * dpr
canvas.height = window.innerHeight * dpr


export const player = new Player("tester")
const opponent = new Opponent("loti")

player.addToDeck(new Card({cardID: player.deck.size, ...fish}))
player.addToDeck(new Card({cardID: player.deck.size, ...fish}))
player.addToDeck(new Card({cardID: player.deck.size, ...fish}))
player.addToDeck(new Card({cardID: player.deck.size, ...bird}))
player.addToDeck(new Card({cardID: player.deck.size, ...shark}))

// fs.writeFileSync("../mental_card_data/player.json", JSON.stringify(player))

Loader.loadAll([
    "../public/assets/part/type/1.png",
    "../public/assets/part/type/2.png",
    "../public/assets/part/type/3.png",
    "../public/assets/card-zone.png",
    "../public/assets/card/front.png",
    "../public/assets/monster/human.png",
    "../public/assets/monster/bird.png",
    "../public/assets/monster/turtle.png",
    "../public/assets/monster/forestGuardian.png",
    "../public/assets/monster/shark.png",
    "../public/assets/monster/fish.png",

    "../public/assets/world/entity/player/back.png",
    "../public/assets/world/entity/player/front.png",
    "../public/assets/world/entity/player/left.png",
    "../public/assets/world/entity/player/right.png",

    "../public/assets/world/bg/space1/1.png",

    "../public/assets/world/entity/etc/E.png",

    "../public/assets/subtitle/profiles/nurseX6.png",
    "../public/assets/subtitle/profiles/playerX6.png",

    "../public/assets/subtitle/subtitle.png",
    "../public/assets/subtitle/subtitleX6.png",

    "../public/assets/world/entity/bed/front.png",
    "../public/assets/world/entity/nurse/front.png",

    "../public/assets/part/abilities/double-attack.png",
    
    "../public/assets/part/sacrifice/0.png",
    "../public/assets/part/sacrifice/1.png",
    "../public/assets/part/sacrifice/2.png",
    "../public/assets/part/sacrifice/3.png",
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
]).then(async () => {
    World.init()
    World.on()
})