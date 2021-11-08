import Grid from "@/Grid";
import { Block } from "@/block";
import { SpriteDimensions } from "@/types";

export default class Wall extends Block {
  constructor(grid: Grid, dimensions: SpriteDimensions) {
    const texture = "assets/block/wall.png";
    super(grid, dimensions, texture);
  }
}
