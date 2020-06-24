const snakeScoreSpan = document.querySelector('#snake-score') as HTMLElement;
const canvas = document.querySelector('#snake-game-canvas') as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

snakeScoreSpan.innerText ='Score: 0';

let tileSize: number, 
    amountOfHorizontalTiles: number, 
    amountOfVertivalTiles: number;

var maxTilesInRowOrColum = 25;

function getTileSize(canvas: HTMLCanvasElement){
    if(canvas.width > canvas.height){
        return canvas.width / maxTilesInRowOrColum;
    }else{
        return canvas.height / maxTilesInRowOrColum;
    }
}

function calculateSizes() {
    console.log(' calculateSizes ');
    var newWidth = canvas.parentElement?.getBoundingClientRect().width ?? canvas.getBoundingClientRect().width;
    var newHeight = canvas.parentElement?.getBoundingClientRect().height ?? canvas.getBoundingClientRect().height;

    tileSize = getTileSize(canvas);
    newWidth = Math.floor(newWidth/tileSize) * tileSize;
    newHeight = Math.floor(newHeight/tileSize) * tileSize;

    canvas.width = newWidth;
    canvas.height = newHeight;
    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;;

    amountOfHorizontalTiles = Math.ceil(canvas.width / tileSize);
    amountOfVertivalTiles = Math.ceil(canvas.height / tileSize);    
}

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground() {
    context.strokeStyle = '#ddd';
    context.lineWidth = 0.5;
    context.beginPath();
    for (let x = 0; x < amountOfHorizontalTiles; x++) {
        for (let y = 0; y < amountOfVertivalTiles; y++) {
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
    context.stroke();
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
        var colletedAppleInCurrentFrame = this.x === apple.x && this.y === apple.y;

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
                    var colletedAppleInCurrentFrame = this.x === apple.x && this.y === apple.y;
            
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
                        this.x >= amountOfHorizontalTiles ||
                        this.y >= amountOfVertivalTiles;
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
                        context.rect(this.body[i].x * tileSize, this.body[i].y * tileSize, tileSize, tileSize);
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
            this.x >= amountOfHorizontalTiles ||
            this.y >= amountOfVertivalTiles;
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
            context.rect(this.body[i].x * tileSize, this.body[i].y * tileSize, tileSize, tileSize);
        }
        context.stroke();
    }
};

function initCanvas(){
    tileSize = getTileSize(canvas);
    canvas.width = Math.floor((canvas.parentElement?.getBoundingClientRect().width ?? canvas.getBoundingClientRect().width) / tileSize) * tileSize;
    canvas.height = Math.floor((canvas.parentElement?.getBoundingClientRect().height ?? canvas.getBoundingClientRect().height) / tileSize) * tileSize;
}

var apple = {
    x: 0,
    y: 0,
    draw() {
        context.beginPath();
        context.strokeStyle = 'green';
        context.rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
        context.stroke();
    },
    relocate(){
        do{
            this.x =  Math.floor(Math.random() * (amountOfHorizontalTiles - 1));
            this.y = Math.floor(Math.random() * (amountOfVertivalTiles - 1));
        }while(snake.collidesWithBody(this.x, this.y));
    }
};

(() => {
    initCanvas();    
    calculateSizes();
})();

apple.relocate();
drawBackground();

window.addEventListener('resize', () => {
    calculateSizes();
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

    drawBackground();
    
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
        drawBackground();
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
                        var colletedAppleInCurrentFrame = this.x === apple.x && this.y === apple.y;
                
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
                            this.x >= amountOfHorizontalTiles ||
                            this.y >= amountOfVertivalTiles;
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
                            context.rect(this.body[i].x * tileSize, this.body[i].y * tileSize, tileSize, tileSize);
                        }
                        context.stroke();
                    }
                };
                
                if(amountOfHorizontalTiles >= amountOfVertivalTiles){
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