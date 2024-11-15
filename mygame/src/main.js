import kaplay from "kaplay";
import "kaplay/global";
import { createPlayer, directionalAnimations, loadPlayerSprites } from "./player";
import { loadSkeletonSprite } from "./enemies/skeleton";
import { createTestEnemy } from "./test_enemy";
import { createTestInteractable } from "./test_interactable";
import { dungeonLoader } from "./dungeons";
import { DungeonMaster } from "./DungeonMaster";

// Start a kaboom game
const k = kaplay({
  // Scale the whole game up
  debug: true,
  scale: 4,
  // Set the default font
  font: "monospace",
  background: "#000000",
  // Works with onButtonPressed, onButtonDown, onButtonReleased
  // Allows for multiple keys to work for one action
  buttons: {
    Left: {
      keyboard: ["left", "a"],
    },
    Right: {
      keyboard: ["right", "d"],
    },
    Up: {
      keyboard: ["up", "w"],
    },
    Down: {
      keyboard: ["down", "s"],
    },
    attack: {
      keyboard: ["space"],
    },
    interact: {
      keyboard: ["f"],
    },
    weaponSwap: {
      keyboard: ["e"],
    },
    paletteSwap: {
      keyboard: ["c"],
    }
  }
});

//loadPlayerSprites();
//loadSkeletonSprite();

const dm = new DungeonMaster();
//dungeonLoader();
//const player = createPlayer();

// const enemy = createTestEnemy();
// const interactable = createTestInteractable();

// Add a platform
/*add([
  rect(width(), 24),
  area(),
  outline(1),
  pos(0, height() - 24),
  body({ isStatic: true }),
]);*/

/*const getInfo = () =>
  `
Anim: ${player.curAnim()}
Frame: ${player.frame}
`.trim();*/

// Add some text to show the current animation
//const label = add([text(""/*getInfo()*/, { size: 12 }), color(255, 255, 255), pos(4), fixed()]);

//label.onUpdate(() => {
  //label.text = getInfo();
//});



// Check out https://kaboomjs.com#SpriteComp for everything sprite() provides