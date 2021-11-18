import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { BulletProperties } from "@/types";
import { Enemy, Turret } from "@/block";

export default class Bullet {
  private grid: Grid;
  private turret: Turret;
  public target: Enemy;
  public properties: BulletProperties;
  public graphics: PIXI.Graphics;
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

    const graphics = new PIXI.Graphics();
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xde3249, 1);
    graphics.drawCircle(0, 0, 15);
    graphics.position.x = x;
    graphics.position.y = y;
    graphics.endFill();
    graphics.zIndex = 1000;

    this.graphics = graphics;
  }

  public destroy() {
    this.graphics.destroy();
  }

  public tick(delta: number) {
    const source = this.graphics.position;
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

    this.graphics.position.x += velX;
    this.graphics.position.y += velY;
  }

  // console.log("bullet travel:");
}
