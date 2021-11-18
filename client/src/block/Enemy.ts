import * as PIXI from "pixi.js";
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

  private headerContainer = new PIXI.Container();

  // private visiblePath: Path;

  private properties: EnemyProperties;
  public health: number;

  constructor(
    grid: Grid,
    dimension: Dimension,
    coordinate: Coordinate,
    path: Array<GridTile>,
    properties: EnemyProperties
  ) {
    super(grid, dimension, coordinate);

    this.path = path;
    this.properties = properties;
    this.health = this.properties.maxHealth;

    this.pathLocation = 0; // Init at start

    this.direction = this.calculateDirection(
      this.path[this.pathLocation],
      this.path[this.pathLocation + 1]
    );

    this.sprite.zIndex = 100;

    this.container.addChild(this.headerContainer);
    this.updateHeader();
  }

  public updateHeader() {
    const healthBar = new PIXI.Container();

    const width = this.sprite.width * 1.3;
    const height = this.sprite.height * 0.3;
    const x = this.sprite.width - (width / 2 - this.sprite.width / 2);
    const y = -(height * 1.5);

    const padding = height / 5;

    const outer = new PIXI.Graphics();
    outer.beginFill(0x000000);
    outer.drawRect(x, y, width, height);
    outer.endFill();
    healthBar.addChild(outer);

    const inner = new PIXI.Graphics();

    const innerWidth =
      (width - padding * 2) * (this.health / this.properties.maxHealth);

    inner.beginFill(0xde3249);
    inner.drawRect(x + padding, y + padding, innerWidth, height - padding * 2);
    inner.endFill();
    healthBar.addChild(inner);

    this.headerContainer.removeChildren();
    this.headerContainer.addChild(healthBar);
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
    if (direction === Direction.UP) {
      this.headerContainer.position.y -= step;
      this.sprite.position.y -= step;
    }
    if (direction === Direction.RIGHT) {
      this.headerContainer.position.x += step;
      this.sprite.position.x += step;
    }
    if (direction === Direction.DOWN) {
      this.headerContainer.position.y += step;
      this.sprite.position.y += step;
    }
    if (direction === Direction.LEFT) {
      this.headerContainer.position.x -= step;
      this.sprite.position.x -= step;
    }
  }

  public doDamage(damage: number) {
    this.health -= damage;

    this.updateHeader();
    if (this.health <= 0) {
      this.destroy();
    }
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

    const step = this.properties.speed * delta;
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

      if (!this.isOnScreen) this.destroy();
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

  public destroy() {
    super.destroy();
    this.headerContainer.destroy();
  }
}
