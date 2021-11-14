import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { Dimension, Coordinate } from "@/types";
import { Block } from "@/block";

export default class InterraciveBlock extends Block {
  private hoverSprite: PIXI.Sprite;

  constructor(grid: Grid, dimension: Dimension, coordinate: Coordinate) {
    super(grid, dimension, coordinate);

    this.sprite.interactive = true;
    this.sprite.buttonMode = true;

    this.sprite
      .on("pointerdown", () => this.onClick())
      .on("pointerup", () => this.onClickRelease())
      .on("pointerover", () => this.onHover())
      .on("pointerout", () => this.onHoverOut());
  }

  protected onClick(texture?: PIXI.Texture<PIXI.Resource>) {
    if (texture) {
      this.showHoverSprite(texture);
    } else if (this.texture.onClick) {
      this.sprite.texture = this.texture.onClick;
    }
    // this.sprite.tint = 0x888888;
  }

  protected onClickRelease() {
    // this.sprite.tint = 0x888888;
  }

  protected onHover(texture?: PIXI.Texture<PIXI.Resource>) {
    if (texture) {
      this.showHoverSprite(texture);
    } else if (this.texture.onHover) {
      this.sprite.texture = this.texture.onHover;
    }
    this.sprite.tint = 0x888888;
  }

  protected onHoverOut() {
    if (this.hoverSprite) this.destroyHoverSprite();

    this.sprite.texture = this.texture.default;
    this.sprite.tint = 0xffffff;
  }

  private showHoverSprite(texture: PIXI.Texture<PIXI.Resource>) {
    if (this.hoverSprite) this.destroyHoverSprite();

    const hoverSprite = PIXI.Sprite.from(texture);

    hoverSprite.width = this.sprite.width;
    hoverSprite.height = this.sprite.width;
    hoverSprite.position.x = this.sprite.position.x;
    hoverSprite.position.y = this.sprite.position.y;
    this.hoverSprite = hoverSprite;

    this.grid.app.stage.addChild(this.hoverSprite);
  }

  private destroyHoverSprite() {
    if (!this.hoverSprite.destroyed) {
      this.hoverSprite.destroy();
    }
  }
}
