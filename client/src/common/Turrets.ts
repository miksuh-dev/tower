import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { Turret } from "@/block";
import { GridTile } from "@/types";

export default class Turrets {
  private grid: Grid;
  public container = new PIXI.Container();
  public units = new Array<Turret>();

  constructor(grid: Grid) {
    this.grid = grid;
    this.container;
  }

  public add(gridPosition: GridTile) {
    const { x, y } = gridPosition;
    const coordinate = this.grid.gridTileToCoordinate(gridPosition);

    const turretProperties = {
      range: 200,
    };

    const newBlock = new Turret(
      this.grid,
      {
        width: this.grid.tile.width,
        height: this.grid.tile.height,
      },
      coordinate,
      turretProperties
    );

    this.grid.board[x][y] = newBlock;
    this.grid.updatePath();
  }
}
