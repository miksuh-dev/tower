import Grid from "@/grid";
import { InterraciveBlock } from "@/blocks/common";
import { BlockDimensions } from "@/types";

export class Turret extends InterraciveBlock {
  constructor(grid: Grid, dimensions: BlockDimensions) {
    const texture = "assets/blocks/turret.png";
    super(grid, dimensions, texture);

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
