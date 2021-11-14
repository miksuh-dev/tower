import * as PIXI from "pixi.js";
import Grid from "@/Grid";
import { Interactive } from "@/block";
import { Dimension, Coordinate, TurretProperties } from "@/types";

export default class Turret extends Interactive {
  private turretProperties: TurretProperties;
  private rangeSprite = new PIXI.Graphics();

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
  }

  public set properties(turretProperties: TurretProperties) {
    this.turretProperties = turretProperties;
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
}
