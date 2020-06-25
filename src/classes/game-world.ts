import { GameWorldSizesCalculator } from "./game-world-sizes-calculator";
import { Snake } from "./snake";
import { Apple } from "./apple";

export class GameWorld{
    public sizesCalculator: GameWorldSizesCalculator;
    public snake: Snake;
    public apple: Apple;
    
    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D) {
        this.sizesCalculator = new GameWorldSizesCalculator(canvas);
        this.init();
    }

    init(){
        this.snake = new Snake(this.sizesCalculator, this.canvas, this.context);
        this.apple = new Apple(this.context, this.snake, this.sizesCalculator);
        this.sizesCalculator.recalculateSizes();
    }
}