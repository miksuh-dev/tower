import * as PIXI from "pixi.js";
import Grid from "@/grid";
import { BlockDimensions } from "@/types";

export class Block {
  public grid: Grid;
  public sprite: PIXI.Sprite;
  public dimensions: BlockDimensions;

  constructor(
    grid: Grid,
    dimensions: BlockDimensions,
    texture: PIXI.SpriteSource
  ) {
    const { positionX, positionY, width, height } = dimensions;

    const sprite = PIXI.Sprite.from(texture);

    sprite.width = width;
    sprite.height = height;
    sprite.x = positionX;
    sprite.y = positionY;

    grid.app.stage.addChild(sprite);

    this.grid = grid;
    this.sprite = sprite;
    this.dimensions = dimensions;
  }
}
