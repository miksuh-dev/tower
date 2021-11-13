import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { Dimension, Coordinate } from "@/types";
import { Block } from "@/block";

export default class InterraciveBlock extends Block {
  constructor(
    grid: Grid,
    dimension: Dimension,
    coordinate: Coordinate,
    texture: PIXI.SpriteSource
  ) {
    super(grid, dimension, coordinate, texture);

    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
  }

  protected onClick() {
    this.sprite.tint = 0x666666;
  }

  protected onClickRelease() {
    this.sprite.tint = 0x888888;
  }

  protected onHover() {
    this.sprite.tint = 0x888888;
  }

  protected onHoverOut() {
    this.sprite.tint = 0xffffff;
  }
}
