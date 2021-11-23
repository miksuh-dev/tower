import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { Dimension, Coordinate, GridTile, Rect, Texture } from "@/types";
import { textureWithFallback } from "@/utils/texture";

export default class Block {
  public container: PIXI.Container;
  public grid: Grid;
  public sprite: PIXI.Sprite;
  public texture: Texture;
  public initialTexture: PIXI.Texture<PIXI.Resource>;
  public isDestroyed = false;

  constructor(grid: Grid, dimension: Dimension, coordinate: Coordinate) {
    const container = new PIXI.Container();
    container.sortableChildren = true;

    const { width, height } = dimension;
    const { x, y } = coordinate;

    const texture = {
      default: PIXI.Texture.from(textureWithFallback(this.name)),
      notAllowed: PIXI.Texture.from(textureWithFallback("notAllowed")),
    };

    const sprite = PIXI.Sprite.from(texture.default);

    sprite.width = width;
    sprite.height = height;
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.zIndex = 1;

    container.addChild(sprite);
    grid.app.stage.addChild(container);

    this.grid = grid;
    this.sprite = sprite;
    this.texture = texture;
    this.container = container;
  }

  // get gridPosition(): GridTile {
  public get gridPosition(): GridTile {
    return {
      x: Math.round(this.sprite.position.x / this.grid.tile.width),
      y: Math.round(this.sprite.position.y / this.grid.tile.height),
    };
  }

  public get center(): Coordinate {
    return {
      x: this.sprite.position.x + this.grid.tile.width / 2,
      y: this.sprite.position.y + this.grid.tile.height / 2,
    };
  }

  public get name() {
    return this.constructor.name.toLowerCase();
  }

  public destroy() {
    this.sprite.destroy();
    this.isDestroyed = true;
  }

  public getBounds() {
    return this.sprite.getBounds();
  }

  public pointIntersects(coordinate: Coordinate) {
    const { width, height, x, y } = this.sprite.getBounds();

    const top = y;
    const right = x + width;
    const bottom = y + height;
    const left = x;

    return (
      top <= coordinate.y &&
      bottom >= coordinate.y &&
      left <= coordinate.x &&
      right >= coordinate.x
    );
  }

  public intersects(rect: Rect) {
    return (
      this.pointIntersects({ x: rect.x, y: rect.y }) ||
      this.pointIntersects({ x: rect.x + rect.width, y: rect.y }) ||
      this.pointIntersects({
        x: rect.x + rect.width,
        y: rect.y + rect.height,
      }) ||
      this.pointIntersects({ x: rect.x, y: rect.y + rect.height })
    );
  }

  public distance(block: Block) {
    const { x: x1, y: y1 } = this.sprite.position;
    const { x: x2, y: y2 } = block.sprite.position;

    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}
