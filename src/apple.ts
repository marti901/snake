import { Vector2d } from "./vector-2d";
import { GameWorldSizesCalculator } from "./game-world-sizes-calculator";

export class Apple{
    position = new Vector2d();

    constructor(
        private context: CanvasRenderingContext2D,
        private snake: any,
        private gameWorldSizesCalculator: GameWorldSizesCalculator) {
        this.relocate();
    }

    draw() {
        this.context.beginPath();
        this.context.strokeStyle = 'green';
        this.context.rect(
            this.position.x * this.gameWorldSizesCalculator.tileSize, 
            this.position.y * this.gameWorldSizesCalculator.tileSize, 
            this.gameWorldSizesCalculator.tileSize, 
            this.gameWorldSizesCalculator.tileSize);
        this.context.stroke();
    }

    relocate(){
        do{
            this.position.x =  Math.floor(Math.random() * (this.gameWorldSizesCalculator.amountOfHorizontalTiles - 1));
            this.position.y = Math.floor(Math.random() * (this.gameWorldSizesCalculator.amountOfVertivalTiles - 1));
        }while(this.snake.collidesWithBody(this.position.x, this.position.y));
    }
}