import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { Interactive, Enemy } from "@/block";
import { Bullet } from "@/common";
import { Dimension, Coordinate, TurretProperties } from "@/types";

export default class Turret extends Interactive {
  private turretProperties: TurretProperties;
  private rangeSprite = new PIXI.Graphics();
  private bulletContainer = new PIXI.Container();
  private bullets = new Array<Bullet>();

  private lastShot = 0;
  private target: Enemy | undefined;

  constructor(
    grid: Grid,
    dimension: Dimension,
    coordinate: Coordinate,
    turretProperties: TurretProperties
  ) {
    super(grid, dimension, coordinate);

    this.sprite
      .on("pointerdown", () => {
        super.onClick();
        this.onClick();
      })
      .on("pointerup", () => {
        super.onClickRelease();
        this.onClickRelease();
      })
      .on("pointerover", () => {
        super.onHover();
        this.onHover();
      })
      .on("pointerout", () => {
        super.onHoverOut();
        this.onHoverOut();
      });

    this.turretProperties = turretProperties;
    this.container.addChild(this.rangeSprite);
    this.container.addChild(this.bulletContainer);
  }

  public drawRange() {
    const { x, y } = this.center;
    const { range } = this.turretProperties;

    const graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0x454545, 0.5);
    graphics.beginFill(0x6d6d6d, 0.2);
    graphics.drawCircle(x, y, range);
    graphics.endFill();
    graphics.zIndex = 0;

    this.rangeSprite.addChild(graphics);
  }

  public clearRange() {
    this.rangeSprite.removeChildren();
  }

  protected onClick() {}

  protected onClickRelease() {}

  protected onHover() {
    this.drawRange();
  }

  protected onHoverOut() {
    this.clearRange();
  }

  public findTarget() {
    const enemies = this.grid.population.units;

    const target = enemies.find((enemy: Enemy) => {
      if (enemy.isDestroyed) return false;
      return this.isInRange(enemy);
    });

    this.target = target;
  }

  public shoot(target: Enemy) {
    const properties = {
      speed: 20,
      damage: 25,
    };
    const bullet = new Bullet(this.grid, this, target, properties);

    this.bulletContainer.addChild(bullet.graphics);
    this.bullets.push(bullet);
  }

  private isInRange(enemy: Enemy) {
    return this.turretProperties.range >= enemy.distance(this);
  }

  public tick(delta: number) {
    if (!this.target || this.target.isDestroyed || !this.isInRange(this.target))
      this.findTarget();

    if (this.target) {
      this.lastShot -= delta;
      if (this.lastShot < 0) {
        const remainder = Math.abs(this.lastShot);
        this.lastShot = this.turretProperties.shootSpeed - remainder;
        this.shoot(this.target);
      }
    }

    if (this.bullets.length) {
      this.bullets.forEach((bullet: Bullet, index) => {
        const { target } = bullet;

        if (target.isDestroyed) {
          bullet.destroy();
          this.bullets.splice(index, 1);
          return;
        }

        if (target.sprite) {
          bullet.tick(delta);
        }

        if (bullet.hit) {
          target.doDamage(bullet.properties.damage);

          bullet.destroy();
          this.bullets.splice(index, 1);
        }
      });
    }
  }
}
