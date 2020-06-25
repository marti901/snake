import { GameStates } from "../enums/game-states.enum";
import { Snake } from "./snake";
import { Apple } from "./apple";

export class GameStateManager{
    private internalGameState = GameStates.MainMenu;
    
    get gameState(): GameStates{
        return this.internalGameState;
    }

    constructor(private snake: Snake,
        private apple: Apple) { }
    

    public changeGameState(newGameState: GameStates){
        if(newGameState === GameStates.GameOver){
            setTimeout(
                () => this.changeGameState(GameStates.MainMenu),
                2500
            );
        }

        switch(newGameState){
            case GameStates.GameOver:
                this.handleSwitchToGameOver();
                break;
            case GameStates.PlayingGame:
                this.handleSwitchToPlayingGame();
                break;
        };

        this.internalGameState = newGameState;
    }

    handleSwitchToGameOver(){
        setTimeout(
            () => this.changeGameState(GameStates.MainMenu),
            2500
        );
    }

    handleSwitchToPlayingGame(){
        this.snake.reset();
        this.apple.relocate();
    }
}