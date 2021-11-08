import Grid from "@/grid";
import { Turret, Interactive } from "@/block";
import { BlockDimensions } from "@/types";

export default class Ground extends Interactive {
  constructor(grid: Grid, dimensions: BlockDimensions) {
    const texture = "assets/block/ground.png";
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

  protected onClick() {
    const { height, positionX, positionY, width, x, y } = this.dimensions;

    const newBlock = new Turret(this.grid, {
      x,
      y,
      positionX,
      positionY,
      width,
      height,
    });

    this.grid.board[x][y] = newBlock;
    this.sprite.destroy();
    // this.grid.activePath.update();
  }

  protected onHover() {
    const position = {
      x: this.dimensions.x,
      y: this.dimensions.y,
    };

    this.grid.hoverPath.update(position);
  }

  protected onHoverOut() {}
}
