import { createPlayer, directionalAnimations } from "../player";
import { createSkeleton } from "../enemies/skeleton";
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
		const [title, floor, dungeon, ornaments, actions] = DUNGEONS[lvl];
		if(!dungeon) throw new Error("Level is not defined");
	
		//add the floor
		addLevel(floor, FLOOR_SHEET);
	
		//the walls and interactive objects
		const level = addLevel(dungeon, MAIN_SHEET);
		const plyr = level.get('plyr')[0]
		const skel = level.get('skel')[0]
		
		const player = createPlayer();
		const skeleton = createSkeleton();
		player.pos = plyr.pos;
		skeleton.pos = skel.pos;
		skeleton.dir = "Left" // don't know how to default this yet
		level.remove(plyr);
		level.remove(skel);
		const ornLevel = ornaments?.length ? addLevel(ornaments, MAIN_SHEET):undefined;
		if(actions) actions(level, ornLevel);
	}
	// loadSprite('skeleton', 'assests/enemies/skeleton.png', directionalAnimations(
	// 	['idle', 5, {loop: true}],
	// 	['walk', 5, {loop: true}],
	// 	['damage', 3],
	// 	['death', 3]));
	tileLoader();
	scene("main", loadDungeon);
	go("main", 0);
};