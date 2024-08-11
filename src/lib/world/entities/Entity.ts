export abstract class Entity {
    public name: string
    public x: number
    public y: number
    public w: number
    public h: number
    constructor(name: string, xywh: {x: number, y: number, w: number, h: number}) {
        this.name = name
        this.x = xywh.x
        this.y = xywh.y
        this.w = xywh.w
        this.h = xywh.h
    }
    abstract load(): void
}