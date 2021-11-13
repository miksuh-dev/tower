import { Block, Ground } from "@/block";
import { GridTile } from "@/types";
import PF from "pathfinding";

const finder = new PF.DijkstraFinder();

const generateMatrix = (
  board: Block[][],
  tileNumX: number,
  tileNumY: number
): PF.Grid => {
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

const findPath = (
  startPosition: GridTile,
  endPosition: GridTile,
  matrix: PF.Grid
) => {
  const matrixClone = matrix.clone();
  return finder
    .findPath(
      startPosition.y,
      startPosition.x,
      endPosition.y,
      endPosition.x,
      matrixClone
    )
    .map(([y, x]) => ({ x, y }));
};

export { generateMatrix, findPath };
