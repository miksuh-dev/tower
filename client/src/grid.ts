import * as PIXI from "pixi.js";
import { Ground, Wall, Block } from "@/blocks";
import ActivePath from "@/overlay/ActivePath";
import { Tile } from "@/types";
import HoverPath from "./overlay/HoverPath";

class Grid {
  app: PIXI.Application;
  tileNumX: number;
  tileNumY: number;
  startPosition: Tile;
  endPosition: Tile;
  pathDisplay: PIXI.Container;
  board: Block[][];
  tileWidth: number;
  tileHeight: number;

  activePath: ActivePath;
  hoverPath: HoverPath;

  constructor(
    app: PIXI.Application,
    tileNumX: number,
    tileNumY: number,
    startPosition: Tile,
    endPosition: Tile
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

    this.activePath = new ActivePath(this);
    this.hoverPath = new HoverPath(this);
  }

  private equals = (position1: Tile, position2: Tile) =>
    position1.x === position2.x && position1.y === position2.y;

  private isWallBlock = (position: Tile): boolean =>
    position.x === 0 ||
    position.y === 0 ||
    position.x === this.tileNumX - 1 ||
    position.y === this.tileNumY - 1;

  public createEmptyTiles() {
    for (let x = 0; x < this.tileNumX; x++) {
      for (let y = 0; y < this.tileNumY; y++) {
        const positionX = this.tileWidth * x;
        const positionY = this.tileHeight * y;

        const position = {
          x,
          y,
        };

        if (this.equals(position, this.startPosition)) {
          this.board[x][y] = new Ground(this, {
            x,
            y,
            positionX,
            positionY,
            width: this.tileWidth,
            height: this.tileHeight,
          });
          continue;
        }
        if (this.equals(position, this.endPosition)) {
          this.board[x][y] = new Ground(this, {
            x,
            y,
            positionX,
            positionY,
            width: this.tileWidth,
            height: this.tileHeight,
          });
          continue;
        }

        if (this.isWallBlock(position)) {
          this.board[x][y] = new Wall(this, {
            x,
            y,
            positionX,
            positionY,
            width: this.tileWidth,
            height: this.tileHeight,
          });

          continue;
        }
        this.board[x][y] = new Ground(this, {
          x,
          y,
          positionX,
          positionY,
          width: this.tileWidth,
          height: this.tileHeight,
        });
      }
    }
    this.activePath.update();
  }
}

export default Grid;
