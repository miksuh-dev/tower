import * as PIXI from "pixi.js";
import Grid from "@/Grid";

class App {
  app: PIXI.Application;

  constructor() {
    const game = document.getElementById("game");

    if (game) {
      const width = game.clientWidth;
      const height = game.clientHeight;

      const app = new PIXI.Application({
        width,
        height,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
      });

      game.appendChild(app.view);

      const tileNumX = 10;
      const tileNumY = 10;

      const startPosition = {
        x: 1,
        y: 0,
      };

      const endPosition = {
        x: tileNumX - 2,
        y: tileNumY - 1,
      };

      new Grid(app, tileNumX, tileNumY, startPosition, endPosition);
    }
  }
}

new App();
