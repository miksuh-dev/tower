import Grid from "@/Grid";
import { GridTile } from "@/types";
import { Path } from "@/path";
import { generateMatrix, findPath } from "@/utils/pathfind";

export default class HoverPath extends Path {
  constructor(grid: Grid) {
    const texture = "assets/overlay/hoverPath.png";
    super(grid, texture);
  }

  public update(currentPosition: GridTile) {
    const { board, startPosition, endPosition, tileNumX, tileNumY } = this.grid;

    const matrix = generateMatrix(board, tileNumX, tileNumY);
    matrix.setWalkableAt(currentPosition.y, currentPosition.x, false);

    const path = findPath(startPosition, endPosition, matrix);

    super.drawPath(path);
  }
}
