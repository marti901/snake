import { SwipeDirection } from "../enums/swipe-direction.enum";

type TouchEventHandler = (_: TouchEvent) => void;
type SwipeEventObserver = (_: SwipeDirection) => void;

export class SwipeDetector{
    swipeStarted = true;
    touchStartX: number;
    touchStartY: number;
    swipeObservers: Array<SwipeEventObserver> = [];

    touchStartHandler: TouchEventHandler;
    touchMoveHandler: TouchEventHandler;
    touchEndHandler: TouchEventHandler;
    touchCanceleHandler: TouchEventHandler;

    constructor(){
        this.touchStartHandler = (event: TouchEvent) => {
            this.swipeStarted = true;
            this.touchStartX = event.touches[0].clientX;
            this.touchStartY = event.touches[0].clientY;
        };
        this.touchMoveHandler = (event: TouchEvent) => {
            if(this.swipeStarted){
                var diffX = this.touchStartX - event.touches[0].clientX;
                var diffY = this.touchStartY - event.touches[0].clientY;
                var swipteTreshold = 40;
        
                if(Math.abs(diffX) > Math.abs(diffY)){
                    if(diffX > swipteTreshold){
                        this.swipeObservers.forEach(x => x(SwipeDirection.Left));
                    }else if(diffX < -swipteTreshold){
                        this.swipeObservers.forEach(x => x(SwipeDirection.Right));
                    }
                }else{
                    if(diffY > swipteTreshold){
                        this.swipeObservers.forEach(x => x(SwipeDirection.Up));
                    }else if(diffY < -swipteTreshold){
                        this.swipeObservers.forEach(x => x(SwipeDirection.Down));
                    }
                }
            }
        };

        this.touchEndHandler = this.touchCanceleHandler = (event: TouchEvent) => this.swipeStarted = false;
    }

    addSwipeEventObserver(observer: SwipeEventObserver){
        if(this.swipeObservers.length === 0){
            document.addEventListener('touchstart', this.touchStartHandler);
            document.addEventListener('touchmove', this.touchMoveHandler);
            document.addEventListener('touchend', this.touchEndHandler);
            document.addEventListener('touchcancel', this.touchCanceleHandler);
        }

        this.swipeObservers.push(observer);
    }

    removeSwipeEventObserver(observer: SwipeEventObserver){
        const index = this.swipeObservers.indexOf(observer);
        if(index > -1){
            this.swipeObservers.splice(index, 1);
        }

        if(this.swipeObservers.length === 0){
            document.removeEventListener('touchstart', this.touchStartHandler);
            document.removeEventListener('touchmove', this.touchMoveHandler);
            document.removeEventListener('touchend', this.touchEndHandler);
            document.removeEventListener('touchcancel', this.touchCanceleHandler);
        }
    }
}