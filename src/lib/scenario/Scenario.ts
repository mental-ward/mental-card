import { Wait } from "../etc/Wait"
const playerContainer = document.getElementById("player-container")!
const scenarioContainer = document.getElementById("scenario-container")!
const body = document.body
export class Scenario {
    async on() {
        scenarioContainer.classList.remove("hidden")
        await Wait(1)
        playerContainer.style.bottom = `-${body.getBoundingClientRect().height / 100 * 40}px`
        await Wait(0.1)
        scenarioContainer.classList.remove("scenario-off")
        scenarioContainer.classList.add("scenario-on")
    }
    async off() {
        await Wait(1)
        scenarioContainer.classList.add("scenario-off")
        scenarioContainer.classList.remove("scenario-on")
        await Wait(0.1)
        playerContainer.style.bottom = `0px`
        await Wait(1)
        scenarioContainer.classList.add("hidden")
    }
}