import { GameWorldSizesCalculator } from "./game-world-sizes-calculator";
import { Apple } from "./apple";
import { GameBackground } from "./game-background";

const snakeScoreSpan = document.querySelector('#snake-score') as HTMLElement;
const canvas = document.querySelector('#snake-game-canvas') as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

const gameWorldSizesCalculator = new GameWorldSizesCalculator(canvas);
const gameBackground = new GameBackground(context, gameWorldSizesCalculator);
snakeScoreSpan.innerText ='Score: 0';

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

var snake = {
    x: 5,
    y: 5,
    applesEaten: 0,
    body: [
        {x: 3, y: 5},
        {x: 4, y: 5},
        {x: 5, y: 5}
    ],
    velocity: {
        x: 1,
        y: 0
    },
    move(){
        var colletedAppleInCurrentFrame = this.x === apple.position.x && this.y === apple.position.y;

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(this.hasDied()){
            gameMode = 'game-over';
            setTimeout(() => gameMode = 'menu', 1000);snake = {
                x: 5,
                y: 5,
                applesEaten: 0,
                body: [
                    {x: 3, y: 5},
                    {x: 4, y: 5},
                    {x: 5, y: 5}
                ],
                velocity: {
                    x: 1,
                    y: 0
                },
                move(){
                    var colletedAppleInCurrentFrame = this.x === apple.position.x && this.y === apple.position.y;
            
                    this.x += this.velocity.x;
                    this.y += this.velocity.y;
            
                    if(this.hasDied()){
                        gameMode = 'game-over';
                        setTimeout(() => gameMode = 'menu', 3000);
                        return;
                    }
            
                    if(colletedAppleInCurrentFrame){
                        this.applesEaten++;
                        snakeScoreSpan.innerHTML = `Score: ${this.applesEaten}`;
                        apple.relocate();
                    }else{
                        this.body.splice(0, 1);
                    }
            
                    this.body.push({
                        x: this.x,
                        y: this.y
                    });
                },
                hasDied(){
                    return this.isOutSizeCanvas() || this.hasCollidedWithOwnBody(); 
                },
                isOutSizeCanvas(){
                    return this.x < 0 || 
                        this.y < 0 || 
                        this.x >= gameWorldSizesCalculator.amountOfHorizontalTiles ||
                        this.y >= gameWorldSizesCalculator.amountOfVertivalTiles;
                },
                hasCollidedWithOwnBody(){
                    return this.collidesWithBody(this.x, this.y);
                },
                collidesWithBody(x, y){
                    return this.body.findIndex(bodyPart => bodyPart.x === x && bodyPart.y === y) > -1;
                },
                draw() {
                    context.beginPath();
                    context.strokeStyle = 'red';
                    for(var i = 0; i < this.body.length; i++){
                        context.rect(this.body[i].x * gameWorldSizesCalculator.tileSize, this.body[i].y * gameWorldSizesCalculator.tileSize, gameWorldSizesCalculator.tileSize, gameWorldSizesCalculator.tileSize);
                    }
                    context.stroke();
                }
            };
            
            return;
        }

        if(colletedAppleInCurrentFrame){
            this.applesEaten++;
            snakeScoreSpan.innerHTML = `Score: ${this.applesEaten}`;
            apple.relocate();
        }else{
            this.body.splice(0, 1);
        }

        this.body.push({
            x: this.x,
            y: this.y
        });
    },
    hasDied(){
        return this.isOutSizeCanvas() || this.hasCollidedWithOwnBody(); 
    },
    isOutSizeCanvas(){
        return this.x < 0 || 
            this.y < 0 || 
            this.x >= gameWorldSizesCalculator.amountOfHorizontalTiles ||
            this.y >= gameWorldSizesCalculator.amountOfVertivalTiles;
    },
    hasCollidedWithOwnBody(){
        return this.collidesWithBody(this.x, this.y);
    },
    collidesWithBody(x: number, y: number){
        return this.body.findIndex(bodyPart => bodyPart.x === x && bodyPart.y === y) > -1;
    },
    draw() {
        context.beginPath();
        context.strokeStyle = 'red';
        for(var i = 0; i < this.body.length; i++){
            context.rect(this.body[i].x * gameWorldSizesCalculator.tileSize, this.body[i].y * gameWorldSizesCalculator.tileSize, gameWorldSizesCalculator.tileSize, gameWorldSizesCalculator.tileSize);
        }
        context.stroke();
    }
};

const apple = new Apple(context, snake, gameWorldSizesCalculator);

(() => { 
    gameWorldSizesCalculator.recalculateSizes();
})();

apple.relocate();

window.addEventListener('resize', () => {
    gameWorldSizesCalculator.recalculateSizes();
});

var gameMode = 'menu';

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
    if(gameMode === 'menu'){
        drawMenu();
    }else if(gameMode === 'game-over'){
        context.font = `${canvas.width / 6}px Arial`;
        context.textAlign = "center";
        context.fillStyle = "red";
        context.fillText("Game over", canvas.width/2, canvas.height/2 + canvas.width / 24);
    }else{
        gameBackground.draw();
        snake.move();
        apple.draw();
        snake.draw();
    }
}, 100);

document.addEventListener('keydown', (event) => {
    var keyArrowUp = 38;
    var keyArrowDown = 40;
    var keyArrowLeft = 37;
    var keyArrowRight = 39;
    var keyA = 65;
    var keyD = 68;
    var keyW = 87;
    var keyS = 83;

    var keysUsedInGame = [
        keyArrowUp,
        keyArrowDown,
        keyArrowLeft,
        keyArrowRight,
        keyA,
        keyD,
        keyW,
        keyS
    ];

    if(keysUsedInGame.indexOf(event.keyCode) > -1){
        event.preventDefault();
    }

    switch(event.keyCode){
        case keyArrowUp:
        case keyW:
            if(snake.velocity.y !== 1){
                snake.velocity = { x: 0, y: -1 };
            }
            break;
        case keyArrowDown:
        case keyS:
            if(snake.velocity.y !== -1){
                snake.velocity = { x: 0, y: 1 };
            }
            break;
        case keyArrowLeft:
        case keyA:
            if(snake.velocity.x !== 1){
                snake.velocity = { x: -1, y: 0 };
            }
            break;
        case keyArrowRight:
        case keyD:
            if(snake.velocity.x !== -1){
                snake.velocity = { x: 1, y: 0 };
            }
            break;
    }
});

canvas.addEventListener('mousedown', (event) => {
    var canvasBoundingClientRect = canvas.getBoundingClientRect();
    var mouseX = event.x - canvasBoundingClientRect.left;
    var mouseY = event.y - canvasBoundingClientRect.top;

    if(gameMode === 'menu'){
        var startButtonLeft = canvas.width * 0.15;
        var startButtonRight = startButtonLeft + canvas.width * 0.7;
        var startButtonTop = canvas.height * 0.35;
        var startButtonBottom = startButtonTop + canvas.height * 0.3;

        if(
            mouseX > startButtonLeft &&
            mouseX < startButtonRight &&
            mouseY > startButtonTop &&
            mouseY < startButtonBottom){
                snake = {
                    x: 5,
                    y: 5,
                    applesEaten: 0,
                    body: [
                        {x: 3, y: 5},
                        {x: 4, y: 5},
                        {x: 5, y: 5}
                    ],
                    velocity: {
                        x: 0,
                        y: 0
                    },
                    move(){
                        var colletedAppleInCurrentFrame = this.x === apple.position.x && this.y === apple.position.y;
                
                        this.x += this.velocity.x;
                        this.y += this.velocity.y;
                
                        if(this.hasDied()){
                            gameMode = 'game-over';
                            setTimeout(() => gameMode = 'menu', 3000);
                            return;
                        }
                
                        if(colletedAppleInCurrentFrame){
                            this.applesEaten++;
                            snakeScoreSpan.innerHTML = `Score: ${this.applesEaten}`;
                            apple.relocate();
                        }else{
                            this.body.splice(0, 1);
                        }
                
                        this.body.push({
                            x: this.x,
                            y: this.y
                        });
                    },
                    hasDied(){
                        return this.isOutSizeCanvas() || this.hasCollidedWithOwnBody(); 
                    },
                    isOutSizeCanvas(){
                        return this.x < 0 || 
                            this.y < 0 || 
                            this.x >= gameWorldSizesCalculator.amountOfHorizontalTiles ||
                            this.y >= gameWorldSizesCalculator.amountOfVertivalTiles;
                    },
                    hasCollidedWithOwnBody(){
                        return this.collidesWithBody(this.x, this.y);
                    },
                    collidesWithBody(x, y){
                        return this.body.findIndex(bodyPart => bodyPart.x === x && bodyPart.y === y) > -1;
                    },
                    draw() {
                        context.beginPath();
                        context.strokeStyle = 'red';
                        for(var i = 0; i < this.body.length; i++){
                            context.rect(this.body[i].x * gameWorldSizesCalculator.tileSize, this.body[i].y * gameWorldSizesCalculator.tileSize, gameWorldSizesCalculator.tileSize, gameWorldSizesCalculator.tileSize);
                        }
                        context.stroke();
                    }
                };
                
                if(gameWorldSizesCalculator.amountOfHorizontalTiles >= gameWorldSizesCalculator.amountOfVertivalTiles){
                    snake.velocity = { x: 1, y: 0};
                }else{
                    snake.velocity = { x: 0, y: 1};
                }

                apple.relocate();
                gameMode = 'play';
            }
    }
});

var swipeStarted = true;
var touchStartX: number, touchStartY: number;
canvas.addEventListener('touchstart', (event) => {
    if(gameMode = 'play'){
        event.preventDefault();
        swipeStarted = true;
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }

});
canvas.addEventListener('touchmove', (event) => {
    if(gameMode == 'play' && swipeStarted){
        var diffX = touchStartX - event.touches[0].clientX;
        var diffY = touchStartY - event.touches[0].clientY;
        console.log(diffX);
        var swipteTreshold = 40;

        if(Math.abs(diffX) > Math.abs(diffY)){
            if(diffX > swipteTreshold && snake.velocity.x !== 1){
                snake.velocity = { x: -1, y: 0 };
            }else if(diffX < -swipteTreshold && snake.velocity.x !== -1){            
                snake.velocity = { x: 1, y: 0 };
            }
        }else{
            if(diffY > swipteTreshold && snake.velocity.y !== 1){
                snake.velocity = { x: 0, y: -1 };
            }else if(diffY < -swipteTreshold && snake.velocity.y !== -1){
                snake.velocity = { x: 0, y: 1 };
            }
        }
    }
});

canvas.addEventListener("touchend", () => swipeStarted = false);
canvas.addEventListener("touchcancel",() => swipeStarted = false);