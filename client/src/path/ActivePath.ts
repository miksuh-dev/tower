import Grid from "@/Grid";
import { Path } from "@/path";
import { findPath } from "@/utils/pathfind";
import PD from "pathfinding";

export default class ActivePath extends Path {
  constructor(grid: Grid) {
    super(grid);
  }

  public update(matrix: PD.Grid) {
    const { startPosition, endPosition } = this.grid;

    const path = findPath(startPosition, endPosition, matrix);

    super.drawPath(path);
  }
}
