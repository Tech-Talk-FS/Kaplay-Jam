import kaplay from "kaplay";
// --- importing sounds below ---
import dungeon1 from "../Sounds/dungeon1.mp3"
// ---                        ---

const loadSounds = kaplay().loadSound()

export function dungeon1Sound (){
   return loadSounds("dungeon1", dungeon1)
}

module.exports = {dungeon1Sound};