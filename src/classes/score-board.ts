export class ScoreBoard{
    private score = 0;
    private scoreBoardElement: HTMLElement;

    constructor(){
        this.scoreBoardElement = document.querySelector('#snake-score') as HTMLElement;
        this.updateDOM();
    }

    public increaseScore(){
        this.score++;
        this.updateDOM();
    }

    public reset(){
        this.score = 0;
        this.updateDOM();
    }

    private updateDOM(){
        this.scoreBoardElement.innerText = `Score ${this.score}`;
    }
}