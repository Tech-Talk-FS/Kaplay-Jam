import kaplay from "kaplay";
import "kaplay/global";
import { DungeonMaster } from "./DungeonMaster";

// Start a kaboom game
kaplay({
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

window.DM = new DungeonMaster();
// Check out https://kaboomjs.com#SpriteComp for everything sprite() provides