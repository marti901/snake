export class Vector2d{
    constructor(public x: number = 0, public y: number = 0) { }

    set(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    add(toAdd: Vector2d){
        this.x += toAdd.x;
        this.y += toAdd.y;
    }

    equal(other: Vector2d): boolean{
        return this.x === other.x && this.y === other.y;
    }

    clone(): Vector2d{
        return new Vector2d(this.x, this.y);
    }
}