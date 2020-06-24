export class GameWorldSizesCalculator{
    public tileSize: number = 0; 
    public amountOfHorizontalTiles: number = 0;
    public amountOfVertivalTiles: number = 0;
    private maxTilesInRowOrColum = 25;

    constructor(private canvas: HTMLCanvasElement) {
        this.recalculateSizes();
     }

    getAvailableWidth(): number {
        return this.canvas.parentElement?.getBoundingClientRect().width ?? this.canvas.getBoundingClientRect().width;
    }    
    
    getAvailableHeight(): number {
        return this.canvas.parentElement?.getBoundingClientRect().height ?? this.canvas.getBoundingClientRect().height;
    }

    recalculateTileSize(){
        if(this.canvas.width > this.canvas.height){
            this.tileSize = Math.floor(this.canvas.width / this.maxTilesInRowOrColum);
        }else{
            this.tileSize = Math.floor(this.canvas.height / this.maxTilesInRowOrColum);
        }
    }

    recalculateSizes(): void {
        this.recalculateTileSize();
        let newWidth = this.getAvailableWidth();
        let newHeight = this.getAvailableHeight();
    
        newWidth = Math.floor(newWidth/this.tileSize) * this.tileSize;
        newHeight = Math.floor(newHeight/this.tileSize) * this.tileSize;
    
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        this.canvas.style.width = `${newWidth}px`;
        this.canvas.style.height = `${newHeight}px`;;
    
        this.amountOfHorizontalTiles = Math.ceil(this.canvas.width / this.tileSize);
        this.amountOfVertivalTiles = Math.ceil(this.canvas.height / this.tileSize);    
    }
}