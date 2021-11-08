import Grid from "@/grid";
import { Block } from "@/block";
import { BlockDimensions } from "@/types";

export default class Wall extends Block {
  constructor(grid: Grid, dimensions: BlockDimensions) {
    const texture = "assets/block/wall.png";
    super(grid, dimensions, texture);
  }
}
