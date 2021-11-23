import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { Interactive } from "@/block";
import { Dimension, Coordinate } from "@/types";
import { textureWithFallback } from "@/utils/texture";

export default class Ground extends Interactive {
  constructor(grid: Grid, dimension: Dimension, coordinate: Coordinate) {
    super(grid, dimension, coordinate);
  }

  protected onClick() {
    if (this.isBuildAllowed()) {
      const { x, y } = this.gridPosition;
      super.onClick();

      this.grid.turrets.add({ x, y });
      // this.sprite.destroy();
    } else {
      super.onClick(this.texture.notAllowed);
    }
  }

  protected onHover() {
    if (this.isBuildAllowed()) {
      super.onHover(PIXI.Texture.from(textureWithFallback("groundHover")));
    } else {
      super.onHover(this.texture.notAllowed);
    }
  }

  protected onHoverOut() {
    super.onHoverOut();
  }

  protected isBuildAllowed(): boolean {
    const { x, y } = this.gridPosition;
    return this.grid.isNonBlocking({ x, y }) && !this.grid.hasEnemy(this);
  }
}
