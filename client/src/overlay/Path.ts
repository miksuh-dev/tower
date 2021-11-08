import * as PIXI from "pixi.js";
import Grid from "@/Grid";

export default class Path {
  grid: Grid;
  texture: PIXI.SpriteSource;
  path: PIXI.Container;

  constructor(grid: Grid, texture: PIXI.SpriteSource) {
    this.grid = grid;
    this.texture = texture;
  }

  public drawPath(path: Array<Array<number>>) {
    if (this.path) this.path.destroy();
    if (!path) return;

    const newPath = new PIXI.Container();

    const { tileHeight, tileWidth } = this.grid;

    path.forEach((item) => {
      const [y, x] = item;
      const positionX = tileWidth * x;
      const positionY = tileHeight * y;

      const sprite = PIXI.Sprite.from(this.texture);
      sprite.alpha = 0.8;

      sprite.width = tileWidth;
      sprite.height = tileHeight;
      sprite.x = positionX;
      sprite.y = positionY;

      newPath.addChild(sprite);
    });
    this.path = newPath;
    this.grid.app.stage.addChild(this.path);
  }
}
