import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { GridTile } from "@/types";

export default class Path {
  grid: Grid;
  texture: PIXI.SpriteSource;
  container: PIXI.Container;
  path: Array<GridTile>;

  constructor(grid: Grid, texture: PIXI.SpriteSource) {
    this.grid = grid;
    this.texture = texture;
  }

  public drawPath(path: Array<GridTile> = []) {
    if (this.container) this.container.destroy();

    const newContainer = new PIXI.Container();

    const { tileHeight, tileWidth } = this.grid;

    path.forEach((item) => {
      const { x: gridX, y: gridY } = item;

      const x = tileWidth * gridX;
      const y = tileHeight * gridY;

      const sprite = PIXI.Sprite.from(this.texture);
      sprite.alpha = 0.8;

      sprite.width = tileWidth;
      sprite.height = tileHeight;
      sprite.x = x;
      sprite.y = y;
      sprite.zIndex = 5;

      newContainer.addChild(sprite);
    });

    this.container = newContainer;
    this.path = path;
    this.grid.app.stage.addChild(this.container);
  }
}
