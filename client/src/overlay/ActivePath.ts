import Grid from "@/grid";
import Path from "@/overlay/Path";
import { generateMatrix, findPath } from "@/utils/pathfind";

export default class ActivePath extends Path {
  constructor(grid: Grid) {
    const texture = "assets/overlay/activePath.png";
    super(grid, texture);
  }

  public update() {
    const { board, startPosition, endPosition, tileNumX, tileNumY } = this.grid;

    const matrix = generateMatrix(board, tileNumX, tileNumY);
    const path = findPath(startPosition, endPosition, matrix);

    super.drawPath(path);
  }
}
