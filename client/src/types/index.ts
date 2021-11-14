import * as PIXI from "pixi.js";
import { Interactive } from "@/block";

export interface BoardSize {
  x: number;
  y: number;
}

export interface TileSize {
  width: number;
  height: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface Rect {
  width: number;
  height: number;
  x: number;
  y: number;
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

export interface GridTile {
  x: number;
  y: number;
}

export interface TurretProperties {
  range: number;
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

export interface Texture {
  default: PIXI.Texture<PIXI.Resource>;
  onHover?: PIXI.Texture<PIXI.Resource>;
  onClick?: PIXI.Texture<PIXI.Resource>;
  allowed?: PIXI.Texture<PIXI.Resource>;
  notAllowed?: PIXI.Texture<PIXI.Resource>;
}

export enum Direction {
  "UP",
  "RIGHT",
  "DOWN",
  "LEFT",
  "NONE",
}
