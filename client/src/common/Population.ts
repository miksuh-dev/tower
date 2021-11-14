import Grid from "@/Grid";
import { Enemy } from "@/block";
import { UnitQueue, GridTile } from "@/types";
import { findPath } from "@/utils/pathfind";
import { Path } from "@/path";
import PF from "pathfinding";

export default class Population {
  public units: Array<Enemy>;
  private grid: Grid;

  private delay: number;
  private queueCount: number;
  private nextSpawn: number;

  private path: Array<GridTile>;

  private visiblePath: Path;

  constructor(grid: Grid, matrix: PF.Grid) {
    this.grid = grid;
    this.units = new Array();

    this.grid.app.ticker.add((delta) => this.tick(delta));

    this.path = findPath(
      this.grid.startPosition,
      this.grid.endPosition,
      matrix
    );

    this.visiblePath = new Path(this.grid);
    this.visiblePath.drawPath(this.path);
  }

  public createQueue({ delay, queueCount }: UnitQueue) {
    this.delay = delay;
    this.queueCount = queueCount;
    this.nextSpawn = 0;
  }

  private createUnit() {
    const dimension = {
      width: this.grid.tile.width,
      height: this.grid.tile.height,
    };

    const coordinate = {
      x: this.grid.startPosition.x * this.grid.tile.width,
      y: this.grid.startPosition.y * this.grid.tile.height,
    };

    const enemyProperties = {
      speed: 5,
    };

    const newEnemy = new Enemy(
      this.grid,
      dimension,
      coordinate,
      this.path,
      enemyProperties
    );
    this.units.push(newEnemy);
    // console.log("len:", len);
    // console.log("this.units:", this.units);
  }

  public updatePath(matrix: PF.Grid) {
    this.units.forEach((unit: Enemy) => {
      unit.updatePath(matrix);
    });

    this.path = findPath(
      this.grid.startPosition,
      this.grid.endPosition,
      matrix
    );

    this.visiblePath.drawPath(this.path);
  }

  public tick(delta: number) {
    if (this.queueCount > 0) {
      this.nextSpawn = this.nextSpawn - delta;

      if (this.nextSpawn < 0) {
        this.createUnit();

        this.nextSpawn = this.delay;
        this.queueCount--;
      }
    }

    this.units.forEach((unit: Enemy, index) => {
      unit.tick(delta);

      if (!unit.isOnScreen) {
        unit.destroy();
        this.units.splice(index, 1);
        console.log(`destroyd enemy idx ${index}`);
      }
    });
  }
}
