import { Block } from "@/blocks/common";
import { Ground } from "@/blocks";

import { Tile } from "@/types";
import PF from "pathfinding";

const finder = new PF.AStarFinder();

const generateMatrix = (
  board: Block[][],
  tileNumX: number,
  tileNumY: number
) => {
  let matrix = new Array(tileNumX);
  for (let x = 0; x < tileNumX; x++) {
    matrix[x] = new Array(tileNumY);

    for (let y = 0; y < tileNumY; y++) {
      if (board[x][y] instanceof Ground) {
        matrix[x][y] = 0;
      } else {
        matrix[x][y] = 1;
      }
    }
  }
  return new PF.Grid(matrix);
};

const findPath = (startPosition: Tile, endPosition: Tile, matrix: PF.Grid) => {
  return finder.findPath(
    startPosition.y,
    startPosition.x,
    endPosition.y,
    endPosition.x,
    matrix
  );
};

export { generateMatrix, findPath };
