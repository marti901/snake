import { KeyboardKeys } from "../enums/keyboard-keys.enum";

type KeyboardEventHandler = (_: KeyboardEvent) => void;

export class Keyboard{
    private keysUsedInGame = [
        KeyboardKeys.ArrowUp,
        KeyboardKeys.ArrowDown,
        KeyboardKeys.ArrowLeft,
        KeyboardKeys.ArrowRight,
        KeyboardKeys.A,
        KeyboardKeys.D,
        KeyboardKeys.W,
        KeyboardKeys.S
    ];
    keyDownObservers: Array<KeyboardEventHandler> = [];
    keyDownHandler: KeyboardEventHandler;

    constructor(){
        this.keyDownHandler = (event: KeyboardEvent) =>{
            const keyCode = event.keyCode;
            if(this.keysUsedInGame.indexOf(keyCode) > -1){
                event.preventDefault();
                this.keyDownObservers.forEach(x => x(event));
            }
        };
    }

    addKeyDownOberserver(observer: KeyboardEventHandler){
        if(this.keyDownObservers.length === 0){
            document.addEventListener('keydown', this.keyDownHandler);
        }

        this.keyDownObservers.push(observer);
    }

    removeKeyDownOberserver(observer: KeyboardEventHandler){
        const index = this.keyDownObservers.indexOf(observer);
        if(index > -1){
            this.keyDownObservers.splice(index, 1);
        }

        if(this.keyDownObservers.length === 0){
            document.removeEventListener('keydown', this.keyDownHandler);
        }
    }
}