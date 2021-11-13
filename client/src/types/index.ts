// import * as PIXI from "pixi.js";
import { Interactive } from "@/block";

export interface Dimension {
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

export interface GridTile {
  x: number;
  y: number;
}

export interface EnemyProperties {
  speed: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface UnitQueue {
  delay: number;
  queueCount: number;
}

export enum DIRECTION {
  "UP",
  "RIGHT",
  "DOWN",
  "LEFT",
  "NONE",
}
