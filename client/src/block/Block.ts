import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { Dimension, Coordinate, GridTile } from "@/types";

export default class Block {
  public grid: Grid;
  public sprite: PIXI.Sprite;

  constructor(
    grid: Grid,
    dimension: Dimension,
    coordinate: Coordinate,
    texture: PIXI.SpriteSource
  ) {
    const { width, height } = dimension;
    const { x, y } = coordinate;

    const sprite = PIXI.Sprite.from(texture);

    sprite.width = width;
    sprite.height = height;
    sprite.x = x;
    sprite.y = y;
    sprite.zIndex = 1;

    grid.app.stage.addChild(sprite);

    this.grid = grid;
    this.sprite = sprite;
  }

  public getGridPosition(): GridTile {
    return {
      x: this.sprite.x / this.grid.tileWidth,
      y: this.sprite.y / this.grid.tileHeight,
    };
  }

  public getCenter(): Coordinate {
    return {
      x: this.sprite.x + this.grid.tileWidth / 2,
      y: this.sprite.y + this.grid.tileHeight / 2,
    };
  }

  public destroy() {
    this.sprite.destroy();
  }
}
