// import * as PIXI from "pixi.js";
import { InterraciveBlock } from "@/blocks/common";

export interface BlockDimensions {
  x: number;
  y: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

export interface InterrativeBlockOnClick {
  (block: InterraciveBlock): void;
}

export interface InterraciveBlockOnHover {
  (block: InterraciveBlock): void;
}
export interface InterraciveBlockOnHoverOut {
  (block: InterraciveBlock): void;
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
