import Grid from "@/grid";
import { Block } from "@/blocks/common";
import { BlockDimensions } from "@/types";

class Wall extends Block {
  constructor(grid: Grid, dimensions: BlockDimensions) {
    const texture = "assets/blocks/wall.png";
    super(grid, dimensions, texture);
  }
}

export { Wall };
