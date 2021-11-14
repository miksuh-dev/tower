import Grid from "@/Grid";
import { Block } from "@/block";
import { Dimension, Coordinate } from "@/types";

export default class Wall extends Block {
  constructor(grid: Grid, dimension: Dimension, coordinate: Coordinate) {
    super(grid, dimension, coordinate);
  }
}
