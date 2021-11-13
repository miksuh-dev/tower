import * as PIXI from "pixi.js";
import { Ground, Wall, Block } from "@/block";
import { GridTile, Coordinate } from "@/types";
import { HoverPath } from "./path";
import { Population } from "@/common";

export default class Grid {
  app: PIXI.Application;
  tileNumX: number;
  tileNumY: number;
  startPosition: GridTile;
  endPosition: GridTile;
  pathDisplay: PIXI.Container;
  board: Block[][];
  tileWidth: number;
  tileHeight: number;

  hoverPath: HoverPath;

  population: Population;

  constructor(
    app: PIXI.Application,
    tileNumX: number,
    tileNumY: number,
    startPosition: GridTile,
    endPosition: GridTile
  ) {
    this.app = app;
    this.tileNumX = tileNumX;
    this.tileNumY = tileNumY;

    this.startPosition = startPosition;
    this.endPosition = endPosition;

    const { width, height } = app.screen;
    this.tileWidth = width / tileNumX;
    this.tileHeight = height / tileNumY;

    const board = Array(tileNumX);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(tileNumY);
    }
    this.board = board;

    this.createEmptyTiles();

    this.population = new Population(this);
    this.population.createQueue({
      delay: 450,
      queueCount: 1000,
    });
  }

  private equals = (position1: GridTile, position2: GridTile) =>
    position1.x === position2.x && position1.y === position2.y;

  private isWallBlock = (position: GridTile): boolean =>
    position.x === 0 ||
    position.y === 0 ||
    position.x === this.tileNumX - 1 ||
    position.y === this.tileNumY - 1;

  public createEmptyTiles() {
    for (let gridX = 0; gridX < this.tileNumX; gridX++) {
      for (let gridY = 0; gridY < this.tileNumY; gridY++) {
        const gridPosition = {
          x: gridX,
          y: gridY,
        };

        const dimension = {
          width: this.tileWidth,
          height: this.tileHeight,
        };

        const coordinate = {
          x: gridX * this.tileWidth,
          y: gridY * this.tileHeight,
        };

        if (this.equals(gridPosition, this.startPosition)) {
          this.board[gridX][gridY] = new Ground(this, dimension, coordinate);
          continue;
        }
        if (this.equals(gridPosition, this.endPosition)) {
          this.board[gridX][gridY] = new Ground(this, dimension, coordinate);
          continue;
        }

        if (this.isWallBlock(gridPosition)) {
          this.board[gridX][gridY] = new Wall(this, dimension, coordinate);

          continue;
        }
        this.board[gridX][gridY] = new Ground(this, dimension, coordinate);
      }
    }
  }

  public gridTileToCoordinate(gridTile: GridTile): Coordinate {
    return {
      x: gridTile.x * this.tileWidth,
      y: gridTile.y * this.tileHeight,
    };
  }

  public coordinateToGridTile(coordinate: Coordinate): GridTile {
    return {
      x: Math.round(coordinate.x / this.tileWidth),
      y: Math.round(coordinate.y / this.tileHeight),
    };
  }
}
