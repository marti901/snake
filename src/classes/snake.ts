import { GameObject } from "../interfaces/game-object.interface";
import { Vector2d } from "./vector-2d";
import { SnakeDirectionChange } from "../enums/snake-direction-change.enum";
import { GameWorldSizesCalculator } from "./game-world-sizes-calculator";
import { KeyboardKeys } from "../enums/keyboard-keys.enum";
import { Keyboard } from "./keyboard";
import { SwipeDetector } from "./swipe-detecter";
import { SwipeDirection } from "../enums/swipe-direction.enum";

export class Snake implements GameObject {
    public position: Vector2d;
    private hasEaten: boolean;
    public isAlive: boolean;
    public onSnakeHasDied: () => void;
    private directionChange: SnakeDirectionChange;    
    private body: Array<Vector2d>;
    private velocity: Vector2d;
    private keyboard = new Keyboard();
    private swipeDetector: SwipeDetector; 

    constructor(
        private gameWorldSizesCalculator: GameWorldSizesCalculator,
        canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D) { 
            this.swipeDetector = new SwipeDetector(canvas);
            this.reset();
            const self = this;
            this.keyboard.addKeyDownOberserver((event) => self.handleKeyboardInput(event));
            this.swipeDetector.addSwipeEventObserver((direction: SwipeDirection) => self.handleSwipe(direction));
        }

    reset(){
        this.position = new Vector2d(5, 5);
        this.hasEaten = false;
        this.isAlive = true;
        this.directionChange = SnakeDirectionChange.None;
        this.body = [
            new Vector2d(3, 5),
            new Vector2d(4, 5),
            new Vector2d(5, 5)
        ];
        this.velocity = new Vector2d(1, 0);
    }

    eatApple(){
        this.hasEaten = true;
    }

    changeMovementDirection(snakeDirectionChange: SnakeDirectionChange){
        this.directionChange = snakeDirectionChange;
    }

    update(){
        if(!this.isAlive){
            return;
        }

        this.updateMovementDirection();

        this.position.add(this.velocity);

        if(this.hasDied()){
            if(this.onSnakeHasDied){
                this.onSnakeHasDied();
            }
            this.isAlive = false;
            return;
        }

        if(!this.hasEaten){
            this.body.splice(0, 1);
        }else{
            this.hasEaten = false;
        }

        this.body.push(this.position.clone());
    }
    
    private updateMovementDirection(){
        if(this.velocity.x !== 1 &&
            this.directionChange === SnakeDirectionChange.Left){
            this.velocity.set(-1, 0);
        } 
        
        else if(this.velocity.x !== -1 &&
            this.directionChange === SnakeDirectionChange.Right){
            this.velocity.set(1, 0);
        }

        else if(this.velocity.y !== -1 &&
            this.directionChange === SnakeDirectionChange.Up){
            this.velocity.set(0, -1);
        }

        else if(this.velocity.y !== 1 &&
            this.directionChange === SnakeDirectionChange.Down){
            this.velocity.set(0, 1);
        }

        this.directionChange = SnakeDirectionChange.None;
    }

    private hasDied(){
        return this.isOutSizeCanvas() || this.hasCollidedWithOwnBody(); 
    }

    private isOutSizeCanvas(){
        return this.position.x < 0 || 
            this.position.y < 0 || 
            this.position.x >= this.gameWorldSizesCalculator.amountOfHorizontalTiles ||
            this.position.y >= this.gameWorldSizesCalculator.amountOfVertivalTiles;
    }

    private hasCollidedWithOwnBody(){
        return this.collidesWithBody(this.position);
    }
    
    private collidesWithBody(vector2d: Vector2d){
        return this.body.findIndex(bodyPart => vector2d.equal(bodyPart)) > -1;
    }

    public draw() {
        this.context.beginPath();
        this.context.strokeStyle = 'red';
        for(var i = 0; i < this.body.length; i++){
            this.context.rect(
                this.body[i].x * this.gameWorldSizesCalculator.tileSize, 
                this.body[i].y * this.gameWorldSizesCalculator.tileSize, 
                this.gameWorldSizesCalculator.tileSize, 
                this.gameWorldSizesCalculator.tileSize);
        }
        this.context.stroke();
    }
    
    private handleKeyboardInput(event: KeyboardEvent): void{
        const keyCode = event.keyCode; 

        if(keyCode === KeyboardKeys.ArrowUp || keyCode === KeyboardKeys.W){
            this.directionChange = SnakeDirectionChange.Up;
        }
        else if(keyCode === KeyboardKeys.ArrowDown || keyCode === KeyboardKeys.S){
            this.directionChange = SnakeDirectionChange.Down;
        }
        else if(keyCode === KeyboardKeys.ArrowLeft || keyCode === KeyboardKeys.A){
            this.directionChange = SnakeDirectionChange.Left;
        }
        else if(keyCode === KeyboardKeys.ArrowRight || keyCode === KeyboardKeys.D){
            this.directionChange = SnakeDirectionChange.Right;
        }
    }

    private handleSwipe(direction: SwipeDirection){
        switch(direction){
            case SwipeDirection.Up:
                this.directionChange = SnakeDirectionChange.Up;
                break;

            case SwipeDirection.Down:
                this.directionChange = SnakeDirectionChange.Down;
                break;

            case SwipeDirection.Left:
                this.directionChange = SnakeDirectionChange.Left;
                break;
            
            case SwipeDirection.Right:
                this.directionChange = SnakeDirectionChange.Right;
                break;
        }
    }
}