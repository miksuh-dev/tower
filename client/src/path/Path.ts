import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { GridTile } from "@/types";
import { textureWithFallback } from "@/utils/texture";

export default class Path {
  grid: Grid;
  texture: PIXI.Texture<PIXI.Resource>;
  container: PIXI.Container;
  path: Array<GridTile>;

  constructor(grid: Grid) {
    this.container = new PIXI.Container();
    this.grid = grid;

    const texturePath = `assets/block/${this.name}.png`;
    this.texture = PIXI.Texture.from(textureWithFallback(texturePath));
  }

  public drawPath(path: Array<GridTile> = []) {
    if (this.container.children.length) this.container.removeChildren();

    const { height: tileHeight, width: tileWidth } = this.grid.tile;

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
      sprite.zIndex = 1;

      this.container.addChild(sprite);
    });

    this.path = path;
  }

  public get name() {
    return this.constructor.name.toLowerCase();
  }
}
