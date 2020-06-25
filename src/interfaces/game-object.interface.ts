import { Vector2d } from "../classes/vector-2d";

export interface GameObject{
    position: Vector2d;
    draw(): void;
}