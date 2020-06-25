import { Snake } from "./snake";
import { Apple } from "./apple";
import { GameStateManager } from "./game-state-manager";
import { ScoreBoard } from "./score-board";
import { GameEvents } from "../enums/game-events.enum";
import { GameStates } from "../enums/game-states.enum";

export class GameEventHandler{
    
    constructor(
        private snake: Snake,
        private apple: Apple,
        private gameStateManager: GameStateManager,
        private scoreBoard: ScoreBoard) { }

    public handle(gameEvent: GameEvents){
        switch(gameEvent){
            
            case GameEvents.AppleEaten:
                this.handleAppleEaten();
                break;

            case GameEvents.SnakeDied:
                this.handleSnakeDied();
                break;
            
            default:
                console.log(`Unknown game event ${gameEvent}!`);
        }
    }

    private handleAppleEaten(){
        this.scoreBoard.increaseScore();
        this.snake.eatApple();
        this.apple.relocate();
    }

    private handleSnakeDied(){
        this.scoreBoard.reset();
        this.gameStateManager.changeGameState(GameStates.GameOver);
    }
}