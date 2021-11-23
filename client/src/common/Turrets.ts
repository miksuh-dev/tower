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

    this.grid.app.ticker.add((delta) => this.tick(delta));
  }

  public add(gridPosition: GridTile) {
    const { x, y } = gridPosition;
    const coordinate = this.grid.gridTileToCoordinate(gridPosition);

    const turretProperties = {
      range: 250,
      shootSpeed: 10,
      bullet: {
        speed: 20,
        damage: 25,
      },
    };

    const turret = new Turret(
      this.grid,
      {
        width: this.grid.tile.width,
        height: this.grid.tile.height,
      },
      coordinate,
      turretProperties
    );

    this.units.push(turret);

    this.grid.board[x][y] = turret;
    this.grid.updatePath();
  }

  public tick(delta: number) {
    this.units.forEach((unit: Turret) => {
      unit.tick(delta);
    });
  }
}
