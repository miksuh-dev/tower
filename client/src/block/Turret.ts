import Grid from "@/Grid";
import { Interactive } from "@/block";
import { Dimension, Coordinate } from "@/types";

export default class Turret extends Interactive {
  constructor(grid: Grid, dimension: Dimension, coordinate: Coordinate) {
    const texture = "assets/block/turret.png";
    super(grid, dimension, coordinate, texture);

    this.sprite
      .on("pointerdown", () => {
        super.onClick();
        this.onClick();
      })
      .on("pointerup", () => {
        super.onClickRelease();
        this.onClickRelease();
      })
      .on("pointerover", () => {
        super.onHover();
        this.onHover();
      })
      .on("pointerout", () => {
        super.onHoverOut();
        this.onHoverOut();
      });
  }

  protected onClick() {}

  protected onClickRelease() {}

  protected onHover() {}

  protected onHoverOut() {}
}
