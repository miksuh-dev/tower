import Grid from "@/Grid";
import { Enemy } from "@/enemy";

export default class Population {
  private units = new Array<Enemy>();
  private grid: Grid;

  constructor(grid: Grid) {
    this.grid = grid;

    // this.grid.app.ticker.add((delta) => this.tick(delta));
  }

  public create(count: Number) {
    for (let i = 0; i < count; i++) {
      const dimensions = {
        x: this.grid.startPosition.x,
        y: this.grid.startPosition.y,
        positionX: this.grid.startPosition.x * this.grid.tileWidth,
        positionY: this.grid.startPosition.y * this.grid.tileHeight,
        width: this.grid.tileWidth,
        height: this.grid.tileHeight,
      };

      const newEnemy = new Enemy(
        this.grid,
        dimensions,
        "assets/enemy/default.png"
      );
      this.units.push(newEnemy);
      console.log("this.units:", this.units);
    }
  }

  /* eslint-disable no-undef */
  public tick(delta: number) {
    // console.log("tick:", delta);
    this.units.forEach((unit: Enemy) => {
      unit.tick(delta);
    });
  }
}
