import Grid from "@/Grid";
import { Block } from "@/block";
import { Dimension, Coordinate } from "@/types";

export default class Wall extends Block {
  constructor(grid: Grid, dimension: Dimension, coordinate: Coordinate) {
    const texture = "assets/block/wall.png";
    super(grid, dimension, coordinate, texture);
  }
}
