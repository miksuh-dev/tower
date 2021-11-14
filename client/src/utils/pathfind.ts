import { Block, Ground } from "@/block";
import { BoardSize, GridTile } from "@/types";
import PF from "pathfinding";

const finder = new PF.DijkstraFinder();

const generateMatrix = (board: Block[][], boardSize: BoardSize): PF.Grid => {
  let matrix = new Array(boardSize.x);
  for (let x = 0; x < boardSize.x; x++) {
    matrix[x] = new Array(boardSize.y);

    for (let y = 0; y < boardSize.y; y++) {
      if (board[x][y] instanceof Ground) {
        matrix[x][y] = 0;
      } else {
        matrix[x][y] = 1;
      }
    }
  }
  // printMatrix(matrix, boardSize);
  return new PF.Grid(matrix);
};

const findPath = (
  startPosition: GridTile,
  endPosition: GridTile,
  matrix: PF.Grid,
  clone: boolean = true
) => {
  const matrixClone = (clone && matrix.clone()) || matrix;

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

const printMatrix = (matrix: Block[][], boardSize: BoardSize) => {
  for (let y = 0; y < boardSize.y; y++) {
    let row = "";
    for (let x = 0; x < boardSize.x; x++) {
      row += `${matrix[x][y]} `;
    }
    console.log(`${y}: ${row}`);
  }
};

const printPath = (path: Array<GridTile>, boardSize: BoardSize) => {
  for (let y = 0; y < boardSize.y; y++) {
    let row = "";
    for (let x = 0; x < boardSize.x; x++) {
      const found = path.find((item) => x === item.x && y === item.y);

      if (found) {
        row += `${1} `;
      } else {
        row += `${0} `;
      }
    }
    console.log(`${y}: ${row}`);
  }
};

export { generateMatrix, findPath };
