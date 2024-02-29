import Loader from "../etc/Loader"
import { World } from "../world/World"

const body = document.body
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const dpr = window.devicePixelRatio

const nameList: {[name: string]: string} = {
    "nurse": "간호사",
    "player": "나"
}

export class Subtitle {
    public static isOn = false
    private static type: number
    private static subtitles: Array<string>
    private static currentSubtitle: string
    private static index: number = 0
    private static callback: Function = () => {}
    private static time: number = 0
    private static stringIndex: number = -1
    private static isTextFinished: boolean = true
    private static output: string = ""
    constructor(type: number) {
        Subtitle.type = type
    }
    public static load() {
        if(Subtitle.isOn) {
            
            Subtitle.currentSubtitle = Subtitle.subtitles[Subtitle.index]
            const teller = Subtitle.currentSubtitle.split(":")[0]
            const description = Subtitle.currentSubtitle.split(":")[1]

            if(!Subtitle.isTextFinished) {
                if(Subtitle.stringIndex !== description.length -1) {
                    Subtitle.time += 1
                    if(Subtitle.time === 2) {
                        Subtitle.stringIndex += 1
                        Subtitle.output += description[Subtitle.stringIndex]
                        Subtitle.time = 0
                    }
                } else {
                    Subtitle.isTextFinished = true
                }
            }
            
            
            const subtitleImage = Loader.get("../public/assets/subtitle/subtitleX6.png")
            const profileImage = Loader.get(`../public/assets/subtitle/profiles/${teller}X6.png`)
            ctx.font = "bold 30px Arial"
            ctx.drawImage(subtitleImage, Math.floor(body.getBoundingClientRect().width * dpr / 2 - subtitleImage.width / 2), Math.floor(body.getBoundingClientRect().height * dpr - subtitleImage.height - 60))
            if(profileImage) {
                ctx.drawImage(profileImage, Math.floor(body.getBoundingClientRect().width * dpr / 2 - subtitleImage.width / 2 + 3 * 6), Math.floor(body.getBoundingClientRect().height * dpr - subtitleImage.height - 60 + 3 * 6))
            }
            ctx.fillText(Subtitle.output, Math.floor(body.getBoundingClientRect().width * dpr / 2 - subtitleImage.width / 2  + 43 * 6), Math.floor(body.getBoundingClientRect().height * dpr - subtitleImage.height + 16 * 6))
            ctx.fillText(nameList[teller], Math.floor(body.getBoundingClientRect().width * dpr / 2 - subtitleImage.width / 2  + 45 * 6), Math.floor(body.getBoundingClientRect().height * dpr - subtitleImage.height + 2 * 6))
        }
    }   
    public static async on(subtitle: Array<string>, callback?: Function) {
        if(callback) {
            Subtitle.callback = callback
        }
        World.pause()
        Subtitle.isOn = true
        Subtitle.subtitles = subtitle
    }
    public static off() {
        Subtitle.isOn = false
        World.start()
    }
    public static next() {
        if(Subtitle.isTextFinished) {
            Subtitle.index += 1
            Subtitle.stringIndex = -1
            Subtitle.output = ""
            if(Subtitle.subtitles[Subtitle.index] !== undefined) {
                Subtitle.currentSubtitle = Subtitle.subtitles[Subtitle.index]
            } else {
                Subtitle.off()
                Subtitle.index = -1
                Subtitle.callback()
            }
            Subtitle.isTextFinished = false
        } else {
            Subtitle.isTextFinished = true
            const description = Subtitle.currentSubtitle.split(":")[1]
            Subtitle.output = description
        }
        
    }
}