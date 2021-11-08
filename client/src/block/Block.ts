import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { SpriteDimensions } from "@/types";

export default class Block {
  public grid: Grid;
  public sprite: PIXI.Sprite;
  public dimensions: SpriteDimensions;

  constructor(
    grid: Grid,
    dimensions: SpriteDimensions,
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
