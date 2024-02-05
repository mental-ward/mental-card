import { Wait } from "../etc/Wait"
const bell = document.getElementById("bell")!
const playerContainer = document.getElementById("player-container")!
const cardInfo = document.getElementById("card-info")!
const scenarioContainer = document.getElementById("scenario-container")!
const body = document.body
export class Scenario {
    private isScenarioOn = false
    async on() {
        if(!this.isScenarioOn) {
            scenarioContainer.classList.remove("hidden")
            await Wait(1)
            bell.style.transform = `translate(0px, ${body.getBoundingClientRect().height / 100 * 40 + 90}px)`
            playerContainer.style.transform = `translate(0px, ${body.getBoundingClientRect().height / 100 * 40}px)`
            cardInfo.style.transform = `translate(500px, 0px)`
            await Wait(0.1)
            scenarioContainer.classList.remove("scenario-off")
            scenarioContainer.classList.add("scenario-on")
            this.isScenarioOn = true
        }
    }
    async off() {
        if(this.isScenarioOn) {
            await Wait(1)
            scenarioContainer.classList.add("scenario-off")
            scenarioContainer.classList.remove("scenario-on")
            await Wait(0.1)
            bell.style.transform = `translate(0px, 90px)`
            playerContainer.style.transform = `translate(0px, 0px)`
            await Wait(1)
            scenarioContainer.classList.add("hidden")
            this.isScenarioOn = false
        }
    }
}