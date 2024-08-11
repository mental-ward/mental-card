import { Wait } from "../etc/Wait";
import { Card } from "../objects/Card";
import { Opponent } from "../objects/Opponent";
import { Player } from "../objects/Player";
import { Field } from "./field";
import { Game } from "./Game";
import {test} from "../../data/cardData/test.json"
import { ArcFade } from "../screenEffect/ArcFade";
import { World } from "../world/World";
import Loader from "../etc/Loader";
import { CardGameUI } from "./CardGameUI";

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const body = document.body
const dpr = window.devicePixelRatio

export class CardGameEngine{
    public static isOn = false
    public static games = new Map<string, Game>()
    static selectedGame: Game
    public static phase: number = 1 // 0: not player turn; 1: draw phase, 2: new arrange phase, 3: arrange phase, 4: ...
    

    static newGame(game: Game) {
        this.games.set(game.gameName, game)
        this.select(game.gameName)
    }

    static select(gameName: string) {
        if((this.selectedGame === undefined || this.selectedGame.gameName !== gameName)) {
            if(!this.isOn) {
                if(this.games.has(gameName)) {
                    this.selectedGame = this.games.get(gameName)!
                }
            } else {
                console.error("try after off the Game")
            }
        }
    }

    static async start() {
        if(this.selectedGame && !this.isOn) {
            await World.off()
            await Wait(1)
            this.selectedGame.field.isOn = true
            this.init()
            await ArcFade.in(1, 0.5)
            for(const [key, value] of this.selectedGame.opponent.deck) {
                this.selectedGame.opponent.addToHand(value)
            }
        }
    }
    static async end() {
        if(this.isOn) {
            this.selectedGame.field.isOn = false
            this.selectedGame.field.init()
            this.selectedGame.player.initHand()
        }
    }

    static skillSelect() {
        
    }

    // static isApplyDefence(fieldID: number) { // TODO
    //     let opponentCard = this.selectedGame.field.fieldArrange.opponent[fieldID]
    //     let playerCard = this.selectedGame.field.fieldArrange.player[fieldID]
    //     if(!this.isPlayerTurn) {
    //         opponentCard = this.selectedGame.field.fieldArrange.player[fieldID]
    //         playerCard = this.selectedGame.field.fieldArrange.opponent[fieldID]
    //     }
    //     let applyDefence: boolean = false
    //     if(playerCard && opponentCard) {
    //         if(playerCard.type === 1) {
    //             if(opponentCard.type === 2) {
    //                 applyDefence = true
    //             }
    //         } else if(playerCard.type === 2) {
    //             if(opponentCard.type === 3) {
    //                 applyDefence = true
    //             }
    //         } else if(playerCard.type === 3) {
    //             if(opponentCard.type === 1) {
    //                 applyDefence = true
    //             }
    //         }
    //     }
    //     return applyDefence
    // }

    // static battle(callback?: Function) { // TODO
    //     for(let i = 0; i < this.selectedGame.numOfCardZone; i++) {
    //         const attackerFieldArrange = this.isPlayerTurn ? this.selectedGame.field.fieldArrange.player[i]! : this.selectedGame.field.fieldArrange.opponent[i]!
    //         const defenderFieldArrange = !this.isPlayerTurn ? this.selectedGame.field.fieldArrange.player[i]! : this.selectedGame.field.fieldArrange.opponent[i]!
    //         if(attackerFieldArrange) {
    //             if(defenderFieldArrange) {
    //                 const canvasCardObject = this.isPlayerTurn ? this.selectedGame.field.canvasCardObjects.player.get(this.selectedGame.field.fieldArrange.player[i]!.uid)! : this.selectedGame.field.canvasCardObjects.opponent.get(this.selectedGame.field.fieldArrange.opponent[i]!.uid)!
    //                 canvasCardObject.attack(this.isPlayerTurn)
    //                 let damage: number = 0
    //                 if(this.isApplyDefence(i)) {
    //                     damage = defenderFieldArrange.def - attackerFieldArrange.atk >= 0 ? 0 : - (defenderFieldArrange.def - attackerFieldArrange.atk)
    //                 } else {
    //                     damage = attackerFieldArrange.atk
    //                 }
                    
    //                 defenderFieldArrange.damage(damage).then(() => {
    //                     if(defenderFieldArrange.heal <= 0) {
    //                         this.selectedGame.field.kill(this.isPlayerTurn ? 0 : 1, i)
    //                     }
    //                     if(attackerFieldArrange.abilities === "double-attack") {
                        
    //                     }
    //                     callback!()
    //                 })
    //             } else {
    //                 console.log("직접공격함") // TODO
    //             }
    //         }  
    //     }
    // }

    private static loop() {
        ctx.clearRect(0, 0, body.getBoundingClientRect().width*dpr, body.getBoundingClientRect().height*dpr)
        CardGameUI.load()
        CardGameEngine.selectedGame.field.load()
        requestAnimationFrame(CardGameEngine.loop)
    }

    private static init() {
        this.selectedGame.field.init()
        this.selectedGame.player.initHand()
        CardGameUI.init(CardGameEngine.selectedGame)
        this.selectedGame.field.placeCard(new Card({uid: 14, ...test}, "leather"), 0, false)
        this.selectedGame.field.placeCard(new Card({uid: 15, ...test}, "leather"), 1, false)

        requestAnimationFrame(CardGameEngine.loop)
    }
}