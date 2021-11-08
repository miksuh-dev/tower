import Grid from "@/grid";
import { Block } from "@/blocks";
import { BlockDimensions } from "@/types";

export default class Wall extends Block {
  constructor(grid: Grid, dimensions: BlockDimensions) {
    const texture = "assets/blocks/wall.png";
    super(grid, dimensions, texture);
  }
}
