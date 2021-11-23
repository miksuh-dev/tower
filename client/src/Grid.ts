import * as PIXI from "pixi.js";
import { Ground, Wall, Block, Turret } from "@/block";
import { BoardSize, GridTile, Coordinate, Dimension } from "@/types";
import { ActivePath } from "./path";
import { Population, Turrets } from "@/common";
import { generateMatrix, findPath } from "./utils/pathfind";
import PF from "pathfinding";

export default class Grid {
  app: PIXI.Application;
  boardSize: BoardSize;
  tile: Dimension;
  startPosition: GridTile;
  endPosition: GridTile;
  pathDisplay: PIXI.Container;
  board: Block[][];
  matrix: PF.Grid;

  activePath: ActivePath;
  turrets: Turrets;
  // hoverPath: HoverPath;

  population: Population;

  constructor(
    app: PIXI.Application,
    boardSize: BoardSize,
    startPosition: GridTile,
    endPosition: GridTile
  ) {
    this.app = app;
    this.app.stage;

    this.boardSize = boardSize;

    this.startPosition = startPosition;
    this.endPosition = endPosition;

    const { width, height } = app.screen;

    this.tile = {
      width: width / boardSize.x,
      height: height / boardSize.y,
    };

    const board = Array(boardSize.x);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(boardSize.y);
    }
    this.board = board;

    this.createEmptyTiles();

    this.matrix = generateMatrix(this.board, this.boardSize);

    const activePath = new ActivePath(this);
    activePath.update(this.matrix);

    this.app.stage.addChild(activePath.container);

    const turrets = new Turrets(this);
    this.app.stage.addChild(turrets.container);

    const population = new Population(this, this.matrix);
    population.createQueue({
      delay: 55,
      queueCount: 10000,
    });

    this.activePath = activePath;
    this.turrets = turrets;
    this.population = population;
  }

  public equals = (position1: GridTile, position2: GridTile) =>
    position1.x === position2.x && position1.y === position2.y;

  private isWallBlock = (position: GridTile): boolean =>
    position.x === 0 ||
    position.y === 0 ||
    position.x === this.boardSize.x - 1 ||
    position.y === this.boardSize.y - 1;

  public createEmptyTiles() {
    for (let gridX = 0; gridX < this.boardSize.x; gridX++) {
      for (let gridY = 0; gridY < this.boardSize.y; gridY++) {
        const gridPosition = {
          x: gridX,
          y: gridY,
        };

        const coordinate = {
          x: gridX * this.tile.width,
          y: gridY * this.tile.height,
        };

        if (this.equals(gridPosition, this.startPosition)) {
          this.board[gridX][gridY] = new Ground(this, this.tile, coordinate);
          continue;
        }
        if (this.equals(gridPosition, this.endPosition)) {
          this.board[gridX][gridY] = new Ground(this, this.tile, coordinate);
          continue;
        }

        if (this.isWallBlock(gridPosition)) {
          this.board[gridX][gridY] = new Wall(this, this.tile, coordinate);

          continue;
        }
        this.board[gridX][gridY] = new Ground(this, this.tile, coordinate);
      }
    }
  }

  public hasEnemy(block: Block) {
    const bounds = block.getBounds();

    return this.population.units.find((unit) => {
      return unit.intersects(bounds);
    });
  }

  public isNonBlocking(gridTile: GridTile) {
    const { x, y } = gridTile;

    const matrix = this.matrix.clone();
    matrix.setWalkableAt(y, x, false);

    return (
      findPath(this.startPosition, this.endPosition, matrix, false).length !== 0
    );
  }

  public updatePath() {
    this.matrix = generateMatrix(this.board, this.boardSize);
    this.activePath.update(this.matrix);
    this.population.updatePath(this.matrix);
  }

  public gridTileToCoordinate(gridTile: GridTile): Coordinate {
    return {
      x: gridTile.x * this.tile.width,
      y: gridTile.y * this.tile.height,
    };
  }

  public coordinateToGridTile(coordinate: Coordinate): GridTile {
    return {
      x: Math.round(coordinate.x / this.tile.width),
      y: Math.round(coordinate.y / this.tile.height),
    };
  }
}
