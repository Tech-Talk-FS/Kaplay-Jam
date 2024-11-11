import { createPlayer } from "../player";
import { FLOOR_SHEET, MAIN_SHEET } from "./charSheets";
import { DUNGEONS } from "./dungeons";
import { tileLoader } from "./tileLoader";


const TILE_DIM = {tileWidth: 16, tileHeight: 16}
const STATIC = () => [body({isStatic: true}), anchor('center')];
const OBSTACLE = () => [...STATIC(), area()]
const rnd = (range)=>({frame: ~~rand(...range)});

/**
 * Currently removes the player from the 
 * @param {*} player 
 */
export const dungeonLoader = () => {

	const loadDungeon = lvl => {
		const [title, floor, dungeon] = DUNGEONS[lvl];
		if(!dungeon) throw new Error("Level is not defined");
	
		//add the floor
		addLevel(floor, FLOOR_SHEET);
	
		//the walls and interactive objects
		const level = addLevel(dungeon, MAIN_SHEET);
		const plyr = level.get('plyr')[0]
		const player = createPlayer();
		player.pos = plyr.pos;
		level.remove(plyr);
	}
	tileLoader();
	scene("main", loadDungeon);
	go("main", 0);
};