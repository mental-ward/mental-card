export class Entity {
    public name: string
    public x: number
    public y: number
    constructor(name: string, axis: {x: number, y: number}) {
        this.name = name
        this.x = axis.x
        this.y = axis.y
    }
}