import { GameWorldSizesCalculator } from "./game-world-sizes-calculator";
import { DrawableObject } from "./interfaces/drawable-object";

export class GameBackground implements DrawableObject{
    constructor(
        private context: CanvasRenderingContext2D,
        private gameWorldSizesCalculator: GameWorldSizesCalculator) { }

    draw() {
        this.context.strokeStyle = '#ddd';
        this.context.lineWidth = 0.5;
        this.context.beginPath();
        for (let x = 0; x < this.gameWorldSizesCalculator.amountOfHorizontalTiles; x++) {
            for (let y = 0; y < this.gameWorldSizesCalculator.amountOfVertivalTiles; y++) {
                this.context.rect(x * this.gameWorldSizesCalculator.tileSize, y * this.gameWorldSizesCalculator.tileSize, this.gameWorldSizesCalculator.tileSize, this.gameWorldSizesCalculator.tileSize);
            }
        }
        this.context.stroke();
    }
}