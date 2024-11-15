/**
 * @typedef {object} Bogey
 * @property {import("kaplay").SpriteCompOpt} spriteOps
 * @property {import("kapley").Vec2 | [number, number]} [pos] - the position of the boge
 * @property {import("kapley").Rect | import("kapley").Shape} [shape]
 * @property {string} [initialState]
 * @property {number} [health]
 * @property {number} [damage]
 * @property {"Left" | "Right" | "Down" | "Up"} [dir]
 * @property {import("kapley").Vec2[]} [path]
 * @property {number} [idleTime]
 * @property {number} [patrolTime]
 * @property {import("kapley").Vec2} [anchor] - if provided the enemy will be tethered to said position when targeting.
 * @property {number} [speed] - currently only used if path is not provided.
 * @property {number} [attackRange] - the distance the enemy must be within prior to beginning its attack. 
 * @property {number} [attackDelay] - the delay between attacks
 * @property {number} [knockback] - the knockback force
 */

import { damage } from "../damage";
import { entity } from "../entity";
import { enemy } from "./enemy";


const BOGEY_STATE = ["idle", "patrol", "persue", "attack", "damage", "death", "disable"];
/**
 * A general use bogey
 * @param {string} sp 
 * @param {import("kaplay").GameObj} player
 * @param {Bogey} [options]
 */
export const bogey = (sp, player, options={}) => {
	const getPrimaryDirection = (vec) => {
		const cardinals = [vec.x>=0 ? "Right":"Left", vec.y>=0 ? "Down":"Up"]
		const d = boge.dir
		boge.dir = cardinals[Number(Math.abs(vec.x)<Math.abs(vec.y))];
		if(boge.dir !== d){
			const action = boge.getCurAnim().name.replace(d, boge.dir);
			boge.play(action)
		}
	}

	const lazyPlay = (action) => {
		const anim = boge.getCurAnim(); 
		const animation =  action+boge.dir;
		boge.play(animation);
    }
	
	const boge = add([
		sprite(sp, options.spriteOps),
		pos(...(Array.isArray(options.pos) ? options.pos:[options.pos])),
		area({shape: options.shape ?? new Rect(vec2(1, 0), 13, 15)}),
		state(options.initialState ?? 'idle', BOGEY_STATE),
		health(options.health ?? 3),
		damage(options.damage ?? 1),
		body(),
		entity(),
		enemy(),
		anchor('center'),
		{lazyPlay, vec: vec2(0, 0)}
	])

	/**
	 * Handle the animation for idling
	 */
	boge.onStateEnter("idle", async () => {
		for(const d of ["Left", "Right", "Down", "Up"]){
			boge.dir = d;
			boge.lazyPlay("idle")
			await wait(options.idleTime ?? 0.25);
		}
		//get the next direction
		if(options.path){
			const v = options.path.shift();
			options.path.push(v); 
			boge.vec = v;
		} else {
			const s = options.speed ?? 50;
			boge.vec = vec2((0.5-Math.random())*s, (0.5-Math.random())*s);
		}
		//figure out the direction to face. 
		getPrimaryDirection(boge.vec);
		const distance = (options.anchor ?? boge.pos).dist(player.pos);
		if(distance <= (options.range ?? 50)) return boge.enterState("persue");
		boge.enterState("patrol");
	});

	boge.onStateEnter("patrol", async () => {
		boge.lazyPlay("walk");
		await wait(options.patrolTime ?? 2);
		boge.enterState("idle");
	});

	boge.onStateUpdate("patrol", () => {
		boge.move(boge.vec);
	});

	boge.onStateEnter("persue", ()=>{
		boge.lazyPlay("walk");

	});

	boge.onStateUpdate("persue", ()=>{
		const vec = player.pos.sub(boge.pos).unit();
		getPrimaryDirection(vec);
		const distance = boge.pos.dist(player.pos);
		if(distance > (options.range ?? 50)) return boge.enterState('idle');
		if(boge.isColliding(player)){
			return boge.enterState('attack');
		}
		boge.move(vec.scale((options.speed ?? 50)));
	});
	
	boge.onStateEnter("attack", async ()=>{
		await wait(options.attackDelay ?? 1);
		boge.lazyPlay('attack');
	});

	boge.onCollide('player_attack', (attack)=>{
		boge.hurt(attack.is("damage") ? attack.damageAmount : 1);
	}); 

	boge.onHurt(async (amt)=>{
		console.log("I got hurt", amt, boge.hp())
		if(boge.hp() > 0){
			boge.lazyPlay('damage');
		} else {
			boge.lazyPlay('death');
			await wait(1);
			boge.destroy();
		}
	});

	boge.onAnimEnd(async (anim)=>{
		if(anim.startsWith('attack')) {
			if(!boge.isColliding(player) && boge.hp() > 0) return boge.enterState('persue')
			player.hurt(options.damage ?? 1);
			player.move(player.pos.sub(boge.pos).unit().scale(options.knockback ?? 500))
			boge.enterState('persue')
		}
	})

	return boge;
};