// import * as PIXI from "pixi.js";
import { Interactive } from "@/block";

export interface SpriteDimensions {
  x: number;
  y: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

export interface InterrativeBlockOnClick {
  (block: Interactive): void;
}

export interface InterraciveBlockOnHover {
  (block: Interactive): void;
}
export interface InterraciveBlockOnHoverOut {
  (block: Interactive): void;
}

export interface InterracitveBlockActions {
  onClick?: InterrativeBlockOnClick;
  onHover?: InterraciveBlockOnHover;
  OnHoverOut?: InterraciveBlockOnHoverOut;
}

export interface Tile {
  x: number;
  y: number;
}
