import { MAIN_SHEET } from './charSheets';
import { FLOOR_TILES } from './constants';
import { DUNGEONS } from './dungeons';
import * as loaders from './loaders';
import { combine } from './utils';
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
		if(this.currentTrack){
			this.currentTrack[v ? 'stop': 'play']();
		}
		this.dungeon.paused = v;
		this.ornaments.paused = v;
	}

	get tiles(){
		if(!this.sheet) return {};
		return this.sheet.tiles;
	}

	constructor(){
		if('instance' in DungeonMaster) throw new Error("Game has already been started");
		this.currentLevel = 0;
		this.locals = {
			health: 10,
			damageAmount: 0,
			attackSpeed: 1,
			destination: 1
		};
		this.currentTrack = undefined
		this.loadResources();
		scene("main",this.loadDungeon.bind(this));
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
		this.currentLevel = index;
		const {title="", floor, dungeon, ornaments=[], setup, tiles} = DUNGEONS[index];
		if(typeof ornaments === 'function'){
			sheet = setup;
			setup = ornaments;
			ornaments = [];
		}
		this.addFloor(floor);
		this.dungeonName = title;
		this.sheet = tiles ? combine(MAIN_SHEET, tiles):MAIN_SHEET;
		this.dungeon = addLevel(dungeon, this.sheet);
		this.ornaments = addLevel(ornaments, this.sheet);
		this.player = this.ornaments?.get('player')[0] ?? this.dungeon.get('player')[0];
		this.currentTrack = play('dungeon1', {loop: true});
		//move the player if necessary.
		const destination = this.locals.destination === undefined ? undefined:this.dungeon.get('destination')[this.locals.destination];
		if(destination){
			this.player.pos = destination.pos
		}
		if(setup) setup();

		console.log(DM.locals);
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

	/**
	 * An attempt to simplify moving in and out of rooms with multiple spawn destinations
	 * @param {number} level 
	 * @param {number} [destination] - The index of the destination to replace
	 */
	go(level, destination){
		this.locals.destination = destination;
		go("main", level)
	}
}