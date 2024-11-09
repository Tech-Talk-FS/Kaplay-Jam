import kaplay from "kaplay";
import "kaplay/global";
import { createPlayer } from "./player";
import { createTestEnemy } from "./test_enemy";

// Start a kaboom game
kaplay({
  // Scale the whole game up
  scale: 4,
  // Set the default font
  font: "monospace",
  // Works with onButtonPressed, onButtonDown, onButtonReleased
  // Allows for multiple keys to work for one action
  buttons: {
    left: {
      keyboard: ["left", "a"],
    },
    right: {
      keyboard: ["right", "d"],
    },
    up: {
      keyboard: ["up", "w"],
    },
    down: {
      keyboard: ["down", "s"],
    },
    attack: {
      keyboard: ["space"],
    }
  }
});

const player = createPlayer();
const enemy = createTestEnemy();

// Add a platform
add([
  rect(width(), 24),
  area(),
  outline(1),
  pos(0, height() - 24),
  body({ isStatic: true }),
]);

const getInfo = () =>
  `
Anim: ${player.curAnim()}
Frame: ${player.frame}
`.trim();

// Add some text to show the current animation
const label = add([text(getInfo(), { size: 12 }), color(0, 0, 0), pos(4)]);

label.onUpdate(() => {
  label.text = getInfo();
});

// Check out https://kaboomjs.com#SpriteComp for everything sprite() provides