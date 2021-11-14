import * as PIXI from "pixi.js";
import { Application } from "@pixi/app";
import Grid from "@/Grid";

class App {
  app: Application;

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

      PIXI.settings.SORTABLE_CHILDREN = true;

      game.appendChild(app.view);

      const boardSize = {
        x: 12,
        y: 12,
      };

      const startPosition = {
        x: 1,
        y: 0,
      };

      const endPosition = {
        x: boardSize.x - 2,
        y: boardSize.y - 1,
      };

      new Grid(app, boardSize, startPosition, endPosition);
    }
  }
}

new App();
