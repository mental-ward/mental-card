import { Chapter } from "../../Chapter";
import { Space } from "../../Space";
import { bed } from "../../entityData/entities";
import { topSpace } from "./top";

const body = document.body
const dpr = window.devicePixelRatio

const background = [
    {tileName: "water", range: 3}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 4}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 4}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 5}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 5}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 5}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 4}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 4}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 4}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 3}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 3}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "water", range: 2}, 
    {tileName: "grass", range: "fill-line"},
    {tileName: "grass", range: "fill-all"},
]
const entities = [
    bed({ x: Math.floor(body.getBoundingClientRect().width / 2 * dpr - 15 * 4 / 2), y: Math.floor(body.getBoundingClientRect().height / 2 * dpr - 26 * 4 / 2) }),
    // new Wall("wall", {x: 1200, y: 0, w: Math.floor(body.getBoundingClientRect().width * dpr), h: Math.floor(body.getBoundingClientRect().height * dpr)}),
]
const linkedSpace = {
    top: topSpace
}

export class Chapter0 extends Chapter {
    space: Space =  new Space(background, entities, linkedSpace)
    init(): void {
        
    }
}