import Grid from "@/Grid";
import { Path } from "@/path";
import { generateMatrix, findPath } from "@/utils/pathfind";

export default class TravelPath extends Path {
  constructor(grid: Grid) {
    const texture = "assets/overlay/activePath.png";
    super(grid, texture);
  }

  public update() {
    const { board, startPosition, endPosition, tileNumX, tileNumY } = this.grid;

    const matrix = generateMatrix(board, tileNumX, tileNumY);
    const path = findPath(startPosition, endPosition, matrix);
    console.log("path:", path);

    super.drawPath(path);
  }
}
