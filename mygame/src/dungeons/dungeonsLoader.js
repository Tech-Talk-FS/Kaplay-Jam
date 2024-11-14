import { createHud, loadHUD } from "../hud/hud";
import { createPlayer, directionalAnimations } from "../player";
import { createSkeleton } from "../enemies/skeleton";
import { FLOOR_SHEET, MAIN_SHEET } from "./charSheets";
import { FLOOR_TILES } from "./constants";
import { DUNGEONS } from "./dungeons";
import { tileLoader } from "./tileLoader";


/**
 * KAPLAY warns that GameObjects can be memory intensive yet addLevel offers no alternative then to create a game object for each item.
 * Being a wall is technically interactive so this will only render the floor.
 * @param {string[]} lvl 
 */
const drawStaticFloor = (lvl) => {
	const l = addLevel([], {tileWidth: 16, tileHeight: 16})
	const sp = [];
	for(let y = 0; y<lvl.length; y++){
		for(let x = 0; x<lvl[y].length; x++){
			if(lvl[y][x] !== ' ') continue;
			sp.push([vec2(x*16-8, y*16-8), ~~rand(...FLOOR_TILES)])
		}
	}
	l.onDraw(()=>{
		for(const [pos,frame] of sp){
			drawSprite({
				sprite: 'tiles',
				frame,
				pos  
			});
		}
	})
}

/**
 * Currently removes the player from the 
 * @param {*} player 
 */
export const dungeonLoader = () => {

	const loadDungeon = lvl => {
		const [title, floor, dungeon, ornaments, actions] = DUNGEONS[lvl];
		if(!dungeon) throw new Error("Level is not defined");
	
		//add the floor
		drawStaticFloor(floor);
	
		//the walls and interactive objects
		const level = addLevel(dungeon, MAIN_SHEET);
		const plyr = level.get('plyr')[0]
		const skel = level.get('skel')[0]
		
		const player = createPlayer();
		player.pos = plyr.pos;
		level.remove(plyr);
		const skeleton = createSkeleton(player);
		skeleton.pos = skel.pos;
		skeleton.dir = "Left" // don't know how to default this yet
		level.remove(skel);
		const ornLevel = ornaments?.length ? addLevel(ornaments, MAIN_SHEET):undefined;
		const hud = createHud(player);
		if(actions) actions(level, ornLevel, hud);
		

	}

	// loadSprite('skeleton', 'assests/enemies/skeleton.png', directionalAnimations(
	// 	['idle', 5, {loop: true}],
	// 	['walk', 5, {loop: true}],
	// 	['damage', 3],
	// 	['death', 3]));
	loadHUD();
	tileLoader();
	scene("main", loadDungeon);
	go("main", 0);

};