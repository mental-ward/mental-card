import { Stuff } from "../entities/Stuff";

export const bed = (axis: {x: number, y: number}) => new Stuff("bed", {x: axis.x, y: axis.y, w: 15 * 4, h: 26 * 4}, "../public/assets/world/entity/bed/front.png")
