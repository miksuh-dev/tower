import Grid from "@/Grid";
import { Block } from "@/block";
import { Dimension, Coordinate } from "@/types";
import { GridTile, EnemyProperties, Direction } from "@/types";
import { findPath } from "@/utils/pathfind";
// import { Path } from "@/path";
import PF from "pathfinding";

export default class Enemy extends Block {
  private direction: Direction;

  private path: Array<GridTile>;
  private pathLocation: number; // -- on x path array tile

  // private visiblePath: Path;

  private enemyProperties: EnemyProperties;

  constructor(
    grid: Grid,
    dimension: Dimension,
    coordinate: Coordinate,
    path: Array<GridTile>,
    enemyProperties: EnemyProperties
  ) {
    super(grid, dimension, coordinate);

    this.path = path;
    this.enemyProperties = enemyProperties;

    this.pathLocation = 0; // Init at start

    this.direction = this.calculateDirection(
      this.path[this.pathLocation],
      this.path[this.pathLocation + 1]
    );

    this.sprite.zIndex = 100;
  }

  public updatePath(matrix: PF.Grid) {
    const currentPosition = this.path[this.pathLocation];

    const path = findPath(currentPosition, this.grid.endPosition, matrix);

    this.path = path;
    this.pathLocation = 0;
  }

  private calculateDirection(current: GridTile, target: GridTile): Direction {
    switch (true) {
      case current.y > target.y:
        return Direction.UP;
      case current.x < target.x:
        return Direction.RIGHT;
      case current.y < target.y:
        return Direction.DOWN;
      case current.x > target.x:
        return Direction.LEFT;
      default:
        return Direction.NONE;
    }
  }

  private calculateDistanceToEnd(
    enemyPosition: Coordinate,
    currentBlockPosition: Coordinate,
    tile: Dimension,
    direction: Direction
  ): number {
    if (direction === Direction.UP)
      return enemyPosition.y - currentBlockPosition.y + tile.height;
    if (direction === Direction.RIGHT)
      return currentBlockPosition.x + tile.width - enemyPosition.x;
    if (direction === Direction.DOWN)
      return currentBlockPosition.y + tile.height - enemyPosition.y;
    if (direction === Direction.LEFT)
      return enemyPosition.x - currentBlockPosition.x + tile.width;

    return 0;
  }

  private move(step: number, direction: Direction) {
    if (direction === Direction.UP) this.sprite.position.y -= step;
    if (direction === Direction.RIGHT) this.sprite.position.x += step;
    if (direction === Direction.DOWN) this.sprite.position.y += step;
    if (direction === Direction.LEFT) this.sprite.position.x -= step;
  }

  public tick(delta: number) {
    const currentPathLocation = this.path[this.pathLocation];

    const currentBlockLocation =
      this.grid.gridTileToCoordinate(currentPathLocation);

    const currentBlock = {
      x: currentBlockLocation.x,
      y: currentBlockLocation.y,
    };

    const distanceToEnd = this.calculateDistanceToEnd(
      {
        x: this.sprite.position.x,
        y: this.sprite.position.y,
      },
      currentBlock,
      this.grid.tile,
      this.direction
    );
    // console.log("distanceToEnd:", distanceToEnd);

    const step = this.enemyProperties.speed * delta;
    if (distanceToEnd > step) {
      return this.move(step, this.direction);
    }

    const nextGridLocation = this.path[this.pathLocation + 1];
    const newNextGridLocation = this.path[this.pathLocation + 2];
    // console.log("nextGridLocation:", nextGridLocation);
    // console.log("newNextGridLocation:", newNextGridLocation);

    if (newNextGridLocation) {
      // Move as far as possible on current tile
      this.move(distanceToEnd, this.direction);

      const newDirection = this.calculateDirection(
        nextGridLocation,
        newNextGridLocation
      );
      // console.log("newDirection:", Direction[newDirection]);

      const remainder = step - distanceToEnd;
      this.move(remainder, newDirection);

      this.direction = newDirection;
      this.pathLocation++;
      // console.log("this.pathLocation:", this.pathLocation);
    } else {
      // No next block, keep moving until destroyeyd
      this.move(step, this.direction);
    }
  }

  public get isOnScreen() {
    const { x, y, width, height } = this.sprite;
    const { width: screenWidth, height: screenHeight } = this.grid.app.screen;

    if (x + width <= 0) return false;
    if (x >= screenWidth) return false;
    if (y + height <= 0) return false;
    if (y >= screenHeight) return false;
    return true;
  }
}
