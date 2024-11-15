import { createHud, loadHUD } from "../hud/hud";
import { createPlayer, directionalAnimations } from "../player";
import { createSkeleton } from "../enemies/skeleton";
import { FLOOR_SHEET, MAIN_SHEET } from "./charSheets";
import { FLOOR_TILES } from "./constants";
import { DUNGEONS } from "./dungeons";
import { tileLoader } from "./tileLoader";
import { bogey } from "../enemies/bogey";


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
		
		
		const ornLevel = ornaments?.length ? addLevel(ornaments, MAIN_SHEET):undefined;
		const game = add([
			timer()
		]); //the game scene all enemies and players must go here.
		const plyr = level.get('plyr')[0]
		const skels = level.get('skel');
		const player = game.add(createPlayer());
		player.pos = plyr.pos;
		//player.go(0,0);
		player.go(1,0);
		player.go(1,1);
		player.go(1,-1);
		player.go(0,1);
		//player.go(0,-1);
		player.go(1,0);
		//player.go(1,1);
		//player.go(1,-1);
		//player.go(-1,0);
		//player.go(-1,1);
		player.go(-1,-1)
		level.remove(plyr);
		
		
		if(skels.length){
			for(const skel of skels){
				const skeleton = game.add(bogey('skeleton', player));
				skeleton.pos = skel.pos;
				skeleton.dir = "Left" // don't know how to default this yet
				skel.destroy(); //remove placed tile
			}
		} 
		const hud = createHud(player, title, game);
		if(actions) actions(level, ornLevel, hud, game);
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