/**
 * @typedef {object} MobilityOptions
 * @param { number } [speed] - The base speed
 * @param { [anim: string, speedMultiplier: number] } [moveTypes]
 * @param { number } [vec] - The radian value of the direction the entity is facing
 */

import { convert } from "../utils";

/**
 * @type {MobilityOptions}
 */
const DEFAULTS = {
	speed: 10,
	moveTypes: [["walk", 1], ["run", 1.25]],
	vec: 0
}
/**
 * 
 * @param {MobilityOptions} [options]
 * @returns 
 */
export const mobile = ({
	speed = DEFAULTS.speed,
	moveTypes = DEFAULTS.moveTypes,
	vec = DEFAULTS.vec
} = {
	speed: DEFAULTS.speed,
	moveTypes: DEFAULTS.moveTypes,
	vec: DEFAULTS.vec
}) => {
	return {
		id: 'mobile',
		require: ["pos", "directional"],
		vec,
		viewAngle: 0,
		moveTypes,
		speed,

		/**
		 * Go is an abstraction to move where it will accept units between -1 and 1 for x and y. 
		 * Using these values it will update the vec in place which will represent a literal position the unit is looking.
		 * 
		 * converts the vector provided to a single radian value to standardize directional operations, hitbox tracking, and movement. 
		 * 
		 * the radian value is used to calculate a new x and y value based on the speed and speed type multiplier
		 * @param {number} x - the x value which should be moved between -1 and 1
		 * @param {number} y - the y value which should be moved between -1 and 1
		 * @param {number} t - the index for the move type
		 */
		go(vec, t=0){
			const v = Math.atan2(vec.y, vec.x);
			const [action, mult] = this.moveTypes[t];
			const speed = this.speed * mult;
			if(v !== this.vec){
				this.vec = v;
				this.viewAngle = convert(this.vec, Math.PI, 180)
				this.direction = ["Right", "Down", "Left", "Up"][~~(convert((Math.PI*1.5)+this.vec,Math.PI,2)+1)%4];	
			}

			this.do(action);
			this.move(vec2(speed*Math.cos(this.vec), speed*Math.sin(this.vec)));
		}
	}
}