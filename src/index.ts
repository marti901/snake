import { GameBackground } from "./classes/game-background";
import { GameEvents } from "./enums/game-events.enum";
import { GameStates } from "./enums/game-states.enum";
import { GameStateManager } from "./classes/game-state-manager";
import { ScoreBoard } from "./classes/score-board";
import { GameEventHandler } from "./classes/game-event-handler";
import { CollisionHandler } from "./classes/collision-handler";
import { GameWorld } from "./classes/game-world";

const canvas = document.querySelector('#snake-game-canvas') as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

const gameWorld = new GameWorld(canvas, context);
const gameBackground = new GameBackground(context, gameWorld.sizesCalculator);

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const gameStateManager = new GameStateManager(gameWorld.snake, gameWorld.apple);
const scoreBoard = new ScoreBoard();

const gameEventHandler = new GameEventHandler(
    gameWorld.snake,
    gameWorld.apple,
    gameStateManager,
    scoreBoard);

const collisionHandler = new CollisionHandler(
    gameWorld.snake,
    gameWorld.apple,
    gameEventHandler
);

gameWorld.snake.onSnakeHasDied = () => {
    gameEventHandler.handle(GameEvents.SnakeDied);
}

const drawableGameObjects = [
  gameBackground,
  gameWorld.apple,
  gameWorld.snake
]; 

(() => { 
    gameWorld.sizesCalculator.recalculateSizes();
})();

gameWorld.apple.relocate();

window.addEventListener('resize', () => {
    gameWorld.sizesCalculator.recalculateSizes();
});

function drawButton(x: number, y: number, width: number, height: number){
    
    context.strokeStyle = "#ccc";
    context.fillStyle = "#ddd";
    context.lineWidth = 8;
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();
    context.fillRect(x, y, width, height);
}

function drawMenu(){

    gameBackground.draw();
    
    drawButton(canvas.width * 0.15, canvas.height * 0.35, canvas.width * 0.7, canvas.height * 0.3);

    context.font = `${canvas.width / 10}px Arial`;
    context.textAlign = "center";
    context.fillStyle = "green";
    context.fillText("Start game", canvas.width/2, canvas.height/2 + (canvas.width / 40));
}

setInterval(() => {
    clearCanvas();

    switch(gameStateManager.gameState){
        case GameStates.MainMenu:
            drawMenu();
            break;
        
        case GameStates.GameOver:
            context.font = `${canvas.width / 6}px Arial`;
            context.textAlign = "center";
            context.fillStyle = "red";
            context.fillText("Game over", canvas.width/2, canvas.height/2 + canvas.width / 24);
            break;
        
        case GameStates.PlayingGame:
            collisionHandler.handle();
            gameWorld.snake.update();
            drawableGameObjects.forEach(x => x.draw());
            break;

        default:
            console.log(`Unknown game state '${gameStateManager.gameState}'!`)
    }
}, 175);

canvas.addEventListener('mousedown', (event) => {
    const canvasBoundingClientRect = canvas.getBoundingClientRect();
    const mouseX = event.x - canvasBoundingClientRect.left;
    const mouseY = event.y - canvasBoundingClientRect.top;

    if(gameStateManager.gameState === GameStates.MainMenu){
        var startButtonLeft = canvas.width * 0.15;
        var startButtonRight = startButtonLeft + canvas.width * 0.7;
        var startButtonTop = canvas.height * 0.35;
        var startButtonBottom = startButtonTop + canvas.height * 0.3;

        if(
            mouseX > startButtonLeft &&
            mouseX < startButtonRight &&
            mouseY > startButtonTop &&
            mouseY < startButtonBottom){
                gameStateManager.changeGameState(GameStates.PlayingGame);
            }
    }
});

canvas.addEventListener('touchstart', (event) => {
    const canvasBoundingClientRect = canvas.getBoundingClientRect();
    const mouseX = event.touches[0].clientX - canvasBoundingClientRect.left;
    const mouseY = event.touches[0].clientY - canvasBoundingClientRect.top;

    if(gameStateManager.gameState === GameStates.MainMenu){
        var startButtonLeft = canvas.width * 0.15;
        var startButtonRight = startButtonLeft + canvas.width * 0.7;
        var startButtonTop = canvas.height * 0.35;
        var startButtonBottom = startButtonTop + canvas.height * 0.3;

        if(
            mouseX > startButtonLeft &&
            mouseX < startButtonRight &&
            mouseY > startButtonTop &&
            mouseY < startButtonBottom){
                gameStateManager.changeGameState(GameStates.PlayingGame);
            }
    }
});