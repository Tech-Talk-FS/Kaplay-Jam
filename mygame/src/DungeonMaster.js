import { MAIN_SHEET } from './dungeons/charSheets';
import { FLOOR_TILES } from './dungeons/constants';
import { DUNGEONS } from './dungeons/dungeons';
import { createHud } from './hud/hud';
import * as loaders from './loaders';
/*
The dungeon master class is an attempt to reorganize and create a more ambiguous environment that in turn is more portable.

Ultimately to combine the current behaviors we have into a more maintainable ecosystem.
*/

/**
 * Start me up to begin the game
 */
export class DungeonMaster {
	//this causes resource to be loaded prior to kaplay existing. 
	//static {
	//	this.instance = new DungeonMaster();
	//}

	get paused(){
		return this.dungeon.paused;
	}
	set paused(v){
		this.dungeon.paused = v;
		this.ornaments.paused = v;
	}

	constructor(msg){
		if('instance' in DungeonMaster) throw new Error("Game has already been started");
		this.currentLevel = 0;
		this.players = [];
		this.msg = msg;
		this.locals = {};
		this.loadResources();
		scene("main",this.loadDungeon.bind(this));
		window.DM = this; //make this instance globally available.
		go("main", 0);
		//DungeonMaster.instance = this; (this does not make instance available in separate files. as such it will just be dungeon masters responsibility to delcare itself on each entity that needs to know of its existance)
	}
	
	/**
	 * Load all resources from the loaders module.
	 */
	loadResources(){
		for(const k of Object.values(loaders)) k();
	}

	loadDungeon(index){
		const [title, floor, map, ornaments=[], setup] = DUNGEONS[index];
		if(typeof ornaments === 'function'){
			setup = ornaments;
			ornaments = [];
		}
		this.addFloor(floor);
		this.dungeon = addLevel(map, MAIN_SHEET);
		this.ornaments = addLevel(ornaments, MAIN_SHEET);
		this.player = this.ornaments.get('player')[0];
		if(setup) setup();
	}

	/**
	 * KAPLAY warns that GameObjects can be memory intensive yet addLevel offers no alternative then to create a game object for each item.
	 * Being a wall is technically interactive so this will only render the floor.
	 * @param {string[]} lvl 
	 */
	addFloor(lvl){
		const l = addLevel([], {tileHeight: 16, tileWidth: 16});
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
}