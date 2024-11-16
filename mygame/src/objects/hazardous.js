import { hazard } from "./hazard";

/**
 * This component contains a hazard. it still maintains the properties given without requiring an area. This is to prevent a pushing or obstructive behavior. If you desire such behavior see the hazard component. 
 * @param {number} damageAmount 
 * @param {number} [knockback]
 * @param {number} [attackDelay]
 * @param {import("kaplay").Shape} [hitbox]
 * @returns 
 */
export const hazardous = (damageAmount, knockback, attackDelay, hitbox) => ({
	id: 'hazardous',
	add(){
		this.add([
			area({shape: hitbox ?? new Rect(vec2(0,0), 16, 16)}),
			state('idle', ['idle', 'attack']),
			hazard(damageAmount, knockback, attackDelay)
		])
	}
});