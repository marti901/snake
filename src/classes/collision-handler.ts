import { Snake } from "./snake";
import { Apple } from "./apple";
import { GameEventHandler } from "./game-event-handler";
import { GameEvents } from "../enums/game-events.enum";

export class CollisionHandler{
    
    constructor(
        private snake: Snake,
        private apple: Apple,
        private gameEventHandler: GameEventHandler) { }

    handle(){
        if(this.snake.position.equal(this.apple.position)){
            this.gameEventHandler.handle(GameEvents.AppleEaten);
        }
    }
}