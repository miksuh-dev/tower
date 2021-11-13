import Grid from "@/Grid";
import { Enemy } from "@/block";
import { UnitQueue, GridTile } from "@/types";
import { findPath, generateMatrix } from "@/utils/pathfind";
import { Path } from "@/path";
import PF from "pathfinding";

export default class Population {
  private units: Array<Enemy>;
  private grid: Grid;

  private delay: number;
  private queueCount: number;
  private nextSpawn: number;

  private path: Array<GridTile>;

  constructor(grid: Grid) {
    this.grid = grid;
    this.units = new Array();

    this.grid.app.ticker.add((delta) => this.tick(delta));

    const matrix = generateMatrix(
      this.grid.board,
      this.grid.tileNumX,
      this.grid.tileNumY
    );

    this.path = findPath(
      this.grid.startPosition,
      this.grid.endPosition,
      matrix
    );

    const visiblePath = new Path(this.grid, "assets/overlay/activePath.png");
    visiblePath.drawPath(this.path);
  }

  public createQueue({ delay, queueCount }: UnitQueue) {
    this.delay = delay;
    this.queueCount = queueCount;
    this.nextSpawn = 0;
  }

  private createUnit() {
    const dimension = {
      width: this.grid.tileWidth,
      height: this.grid.tileHeight,
    };

    const coordinate = {
      x: this.grid.startPosition.x * this.grid.tileWidth,
      y: this.grid.startPosition.y * this.grid.tileHeight,
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

  public onUpdatePath() {
    console.log("on path update");
    const matrix = generateMatrix(
      this.grid.board,
      this.grid.tileNumX,
      this.grid.tileNumY
    );

    this.units.forEach((unit: Enemy) => {
      unit.updatePath(matrix);
    });
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

      if (!unit.isOnScreen()) {
        unit.destroy();
        this.units.splice(index, 1);
        console.log(`destroyd enemy idx ${index}`);
      }
    });
  }
}
