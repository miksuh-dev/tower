import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { SpriteDimensions } from "@/types";

export default class Enemy {
  private sprite: PIXI.Sprite;

  constructor(
    grid: Grid,
    dimensions: SpriteDimensions,
    texture: PIXI.TextureSource
  ) {
    const sprite = PIXI.Sprite.from(texture);
    const { positionX, positionY, width, height } = dimensions;

    sprite.width = width;
    sprite.height = height;
    sprite.x = positionX;
    sprite.y = positionY;

    console.log("dimension:", dimensions);
    grid.app.stage.addChild(sprite);

    this.sprite = sprite;
  }

  /* eslint-disable no-undef */
  public tick(delta: number) {
    // this.sprite.position.x = this.sprite.position.x + delta;
    // this.sprite.position.y = this.sprite.position.y + delta;
    // console.log("this.sprite.position.y:", this.sprite.position.y);
    // console.log("this.sprite.position.y:", this.sprite.position.y);
  }
}
