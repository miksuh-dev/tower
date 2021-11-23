import * as PIXI from "pixi.js";

const TEXTURE = {
  wall: [
    "assets/block/catacomb/catacombs_0.png",
    "assets/block/catacomb/catacombs_1.png",
    "assets/block/catacomb/catacombs_2.png",
    "assets/block/catacomb/catacombs_3.png",
    "assets/block/catacomb/catacombs_4.png",
    "assets/block/catacomb/catacombs_5.png",
    "assets/block/catacomb/catacombs_6.png",
    "assets/block/catacomb/catacombs_7.png",
    "assets/block/catacomb/catacombs_8.png",
    "assets/block/catacomb/catacombs_9.png",
    "assets/block/catacomb/catacombs_10.png",
    "assets/block/catacomb/catacombs_11.png",
    "assets/block/catacomb/catacombs_12.png",
    "assets/block/catacomb/catacombs_13.png",
    "assets/block/catacomb/catacombs_14.png",
    "assets/block/catacomb/catacombs_15.png",
  ],
  ground: [
    "assets/block/grass/grass_0_old.png",
    "assets/block/grass/grass_1_old.png",
    "assets/block/grass/grass_2_old.png",
    "assets/block/grass/grass_flowers_blue_1_old.png",
    "assets/block/grass/grass_flowers_blue_2_old.png",
    "assets/block/grass/grass_flowers_blue_3_old.png",
    "assets/block/grass/grass_flowers_red_1_old.png",
    "assets/block/grass/grass_flowers_red_2_old.png",
    "assets/block/grass/grass_flowers_red_3_old.png",
    "assets/block/grass/grass_flowers_yellow_1_old.png",
    "assets/block/grass/grass_flowers_yellow_2_old.png",
  ],
  enemy: ["assets/block/enemy/draconic_base-red_old.png"],
  turret: ["assets/block/turret/snail_statue.png"],
  bullet: ["assets/bullet/stone_0_new.png"],
  groundHover: ["assets/gui/cursor.png"],
  notAllowed: ["assets/gui/notallowed.png"],
};

const textureWithFallback = (blockName: string): PIXI.TextureSource => {
  try {
    // console.log("blockName:", blockName);
    if ((TEXTURE as any)[blockName]) {
      const textures = (TEXTURE as any)[blockName];

      const random = Math.floor(Math.random() * textures.length);

      // console.log("blockName:", blockName);
      // console.log("textures[random]:", textures[random]);

      const texture = PIXI.Texture.from(textures[random]);
      if (!texture) throw new Error();

      return textures[random];
    } else {
      const texture = PIXI.Texture.from(`assets/block/${blockName}.png`);
      if (!texture) throw new Error();
    }

    return `assets/block/${blockName}.png`;
  } catch (e) {
    console.log(`texture for ${blockName} not found.`);
    return "assets/block/notfound.png";
  }
};

export { textureWithFallback };
