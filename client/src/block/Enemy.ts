import Grid from "@/Grid";
import { Block } from "@/block";
import { Dimension, Coordinate } from "@/types";
import { GridTile, EnemyProperties, DIRECTION } from "@/types";
import { generateMatrix, findPath } from "@/utils/pathfind";
import { Path } from "@/path";
import PF from "pathfinding";

export default class Enemy extends Block {
  private direction: DIRECTION;

  private path: Array<GridTile>;
  private pathLocation: number; // -- on x path array tile

  private visiblePath: Path;

  private enemyProperties: EnemyProperties;

  constructor(
    grid: Grid,
    dimension: Dimension,
    coordinate: Coordinate,
    path: Array<GridTile>,
    enemyProperties: EnemyProperties
  ) {
    super(grid, dimension, coordinate, "assets/enemy/default.png");

    this.path = path;
    this.enemyProperties = enemyProperties;

    this.pathLocation = 0; // Init at start

    this.direction = this.getDirection(
      this.path[this.pathLocation],
      this.path[this.pathLocation + 1]
    );

    // DEBUG DRAW PATH
    // this.visiblePath = new Path(this.grid, "assets/overlay/activePath.png");
    // this.visiblePath.drawPath(this.path);
  }

  public updatePath(matrix: PF.Grid) {
    const currentPosition = this.path[this.pathLocation];
    console.log("currentPosition:", currentPosition);

    const path = findPath(currentPosition, this.grid.endPosition, matrix);
    console.log("path:", path);

    if (path.length) {
      console.log("HAS LENGTH!");
      this.pathLocation = 0;
      this.path = path;

      this.direction = this.getDirection(
        this.path[this.pathLocation],
        this.path[this.pathLocation + 1]
      );
    }
  }

  private getDirection(current: GridTile, target: GridTile): DIRECTION {
    switch (true) {
      case current.y > target.y:
        return DIRECTION.UP;
      case current.x < target.x:
        return DIRECTION.RIGHT;
      case current.y < target.y:
        return DIRECTION.DOWN;
      case current.x < target.x:
        return DIRECTION.LEFT;
      default:
        return DIRECTION.NONE;
    }
  }

  private getDistanceToCenter(
    position: Coordinate,
    center: Coordinate,
    direction: DIRECTION
  ): number {
    if (direction === DIRECTION.UP) return center.y - position.y;
    if (direction === DIRECTION.RIGHT) return center.x - position.x;
    if (direction === DIRECTION.DOWN) return center.y - position.y;
    if (direction === DIRECTION.LEFT) return center.x - position.x;

    return 0;
  }

  private move(step: number, direction: DIRECTION) {
    if (direction === DIRECTION.UP) this.sprite.position.y -= step;
    if (direction === DIRECTION.RIGHT) this.sprite.position.x += step;
    if (direction === DIRECTION.DOWN) this.sprite.position.y += step;
    if (direction === DIRECTION.LEFT) this.sprite.position.x -= step;
  }

  /* eslint-disable no-undef */
  public tick(delta: number) {
    const currentBlockLocation = this.grid.gridTileToCoordinate(
      this.path[this.pathLocation]
    );

    const currentBlockCenter = {
      x: currentBlockLocation.y + this.grid.tileWidth,
      y: currentBlockLocation.y + this.grid.tileHeight,
    };

    const distanceToCenter = this.getDistanceToCenter(
      {
        x: this.sprite.position.x,
        y: this.sprite.position.y,
      },
      currentBlockCenter,
      this.direction
    );

    const step = this.enemyProperties.speed * delta;

    // console.log("distanceToCenter:", distanceToCenter);
    // console.log("step:", step);
    if (distanceToCenter > step) {
      return this.move(step, this.direction);
    }

    const nextGridLocation = this.path[this.pathLocation + 1];
    const newNextGridLocation = this.path[this.pathLocation + 2];

    if (newNextGridLocation) {
      // Move as far as possible on current tile
      this.move(distanceToCenter, this.direction);

      const newDirection = this.getDirection(
        nextGridLocation,
        newNextGridLocation
      );

      // console.log("newDirection:", DIRECTION[newDirection]);

      const remainder = step - distanceToCenter;
      this.move(remainder, newDirection);

      this.direction = newDirection;
      this.pathLocation++;
    } else {
      // No next block, keep moving until destroyeyd
      this.move(step, this.direction);
    }
  }

  public isOnScreen() {
    const { x, y, width, height } = this.sprite;
    const { width: screenWidth, height: screenHeight } = this.grid.app.screen;

    if (x + width <= 0) return false;
    if (x >= screenWidth) return false;
    if (y + height <= 0) return false;
    if (y >= screenHeight) return false;
    return true;
  }
}
