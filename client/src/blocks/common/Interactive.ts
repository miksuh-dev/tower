import * as PIXI from "pixi.js";
import Grid from "@/grid";
import { BlockDimensions } from "@/types";
import { Block } from "@/blocks/common";

export class InterraciveBlock extends Block {
  constructor(
    grid: Grid,
    dimensions: BlockDimensions,
    texture: PIXI.SpriteSource
  ) {
    super(grid, dimensions, texture);

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