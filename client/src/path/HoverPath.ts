import Grid from "@/Grid";
import { GridTile } from "@/types";
import { Path } from "@/path";
import { generateMatrix, findPath } from "@/utils/pathfind";

export default class HoverPath extends Path {
  constructor(grid: Grid) {
    super(grid);
  }

  public update(currentPosition: GridTile) {
    const { board, startPosition, endPosition, boardSize } = this.grid;

    const matrix = generateMatrix(board, boardSize);
    matrix.setWalkableAt(currentPosition.y, currentPosition.x, false);

    const path = findPath(startPosition, endPosition, matrix);

    super.drawPath(path);
  }
}
