import * as PIXI from "pixi.js";

const textureWithFallback = (path: PIXI.TextureSource): PIXI.TextureSource => {
  try {
    const texture = PIXI.Texture.from(path);
    if (!texture) throw new Error();

    return path;
  } catch (e) {
    console.log(`texture ${path} not found.`);
    return "assets/block/notfound.png";
  }
};

export { textureWithFallback };
