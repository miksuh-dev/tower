import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { BulletProperties } from "@/types";
import { Enemy, Turret } from "@/block";
import { textureWithFallback } from "@/utils/texture";

export default class Bullet {
  private grid: Grid;
  private turret: Turret;
  public target: Enemy;
  public properties: BulletProperties;
  public sprite: PIXI.Sprite;
  public hit = false;

  constructor(
    grid: Grid,
    turret: Turret,
    target: Enemy,
    properties: BulletProperties
  ) {
    this.grid = grid;
    this.turret = turret;
    this.target = target;
    this.properties = properties;

    const { x, y } = turret.center;

    const sprite = PIXI.Sprite.from(textureWithFallback("bullet"));

    // const graphics = new PIXI.Graphics();
    // sprite.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    // sprite.beginFill(0xde3249, 1);
    // sprite.drawCircle(0, 0, this.grid.tile.width / 7);
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.width = 50;
    sprite.height = 50;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    // sprite.endFill();
    sprite.zIndex = 1000;

    this.sprite = sprite;
  }

  public destroy() {
    this.sprite.destroy();
  }

  public tick(delta: number) {
    const source = this.sprite.position;
    const target = this.target.center;

    const deltaX = target.x - source.x;
    const deltaY = target.y - source.y;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocityScale = (this.properties.speed / distance) * delta;
    // console.log("velocityScale:", velocityScale);

    if (distance < this.target.sprite.width / 2) {
      this.hit = true;
      return;
    }

    const velX = deltaX * velocityScale;
    const velY = deltaY * velocityScale;

    this.sprite.position.x += velX;
    this.sprite.position.y += velY;
  }

  // console.log("bullet travel:");
}
