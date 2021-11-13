import Grid from "@/Grid";
import { Turret, Interactive } from "@/block";
import { Dimension, Coordinate } from "@/types";

export default class Ground extends Interactive {
  constructor(grid: Grid, dimension: Dimension, coordinate: Coordinate) {
    const texture = "assets/block/ground.png";
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

  protected onClick() {
    const { height, width, x, y } = this.sprite;

    const newBlock = new Turret(
      this.grid,
      {
        width,
        height,
      },
      {
        x,
        y,
      }
    );

    const { x: gridX, y: gridY } = this.getGridPosition();

    this.grid.board[gridX][gridY] = newBlock;
    this.sprite.destroy();
    this.grid.population.onUpdatePath();
  }

  protected onHover() {
    if (this.grid.hoverPath) {
      const position = this.getGridPosition();

      this.grid.hoverPath.update(position);
    }
  }

  protected onHoverOut() {}
}
